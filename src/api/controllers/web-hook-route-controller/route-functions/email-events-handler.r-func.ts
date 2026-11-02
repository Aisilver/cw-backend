import type { Request, Response } from "express";
import { ResendEmailWebHookSubscription } from "../../../../subscriptions/resend-email-webhook.subs.js";

export function WEBHOOK_RF_resendEmailWebhookHandler (req: Request, res: Response) {
    try {
        ResendEmailWebHookSubscription.next(req.body)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}