import type { CreateEmailOptions } from "resend";
import type { ResendWebhookEventTypes } from "../../global-types/resend-webhook.type.js";
import { ResendEmailWebHookSubscription } from "../../subscriptions/resend-email-webhook.subs.js"
import type { Subscription } from "rxjs";
import { _ResendManager } from "../../classes/resend-manager/resend-manager.class.js";
import { TIME_CONSTANT } from "../../constants/time-in-seconds.const.js";

type EmailSendResponse = {
    delivered: boolean;
    event: ResendWebhookEventTypes;
    message?: string
}


const { MINUTE_MS } = TIME_CONSTANT

export abstract class MailHandler {
    private subscription?: Subscription

    protected async SendMail (opts: CreateEmailOptions) {
        const response = await this.sendEmail(opts)

        this.subscription?.unsubscribe()

        return response
    }

    private emailEventsMessages (email: string, eventType?: ResendWebhookEventTypes) {
        let message = ""

        if(!eventType) {
            message = `mail has been sent but current state of mail is unknown, wait few minutes and try again if mail is not recieved`
        } else {
            switch(eventType) {
                case "email.delivery_delayed": message = "we’re experiencing a delay delivering your email. It should arrive shortly. If you don’t receive it, please check your spam folder or try again later."
                    break;
                case "email.complained": message = `email delivery to "${email}" has been paused due to a spam report. Contact support if this was accidental.`
                    break;
                case "email.bounced": message = `we couldn’t deliver the email to "${email}" . Please check that your email is correct and try again.`
                    break;
                case "email.suppressed": message = `we’re unable to send emails to "${email}" at the moment, please try another email or contact support if you believe this is an error.`
                    break;
                case "email.failed": message = `an error has occured while sending to "${email}", please try another email or contact support.`
                    break
            }
        }

        return message
    };
    
    private sendEmail = (opts: CreateEmailOptions) =>  new Promise<EmailSendResponse>(async (res, rej) => {
        let emailId!: string,

        emailSendingTimeout!: NodeJS.Timeout,

        afterSentEventTimeout!: NodeJS.Timeout
        
        this.subscription = ResendEmailWebHookSubscription.subscribe(event => { 
            const {type: eventType, data} = event,
            
            {email_id, to} = data,

            firstRecipent = to[0] ?? "unknown address"

            if(emailId != email_id) return

            if(eventType == 'email.sent') 
                afterSentEventTimeout = setTimeout(() => res({delivered: false, event: eventType, message: this.emailEventsMessages(firstRecipent)}), MINUTE_MS)
 
            else{
                clearTimeout(afterSentEventTimeout)

                res({event: eventType, delivered: eventType == "email.delivered", message: this.emailEventsMessages(firstRecipent, eventType)})
            }
        })

        try {
            emailSendingTimeout = setTimeout(() => rej(Error("email sending timedout")), MINUTE_MS)

            const {data, error} = await _ResendManager.RESEND.emails.send(opts)

            if(error) throw error

            const {id} = data

            if(!id) throw Error("email id was not defined")

            emailId = id
        } catch (error: any) {
            rej(error)
        } finally {
            clearTimeout(emailSendingTimeout)
        }
    }) 
}