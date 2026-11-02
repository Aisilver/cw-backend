import { Resend } from "resend"

class ResendManager {
    private declare resend: Resend;

    get RESEND () {
        return this.resend
    }

    async Initialize () {
        const {RESEND_API_KEY} = process.env

        this.resend = new Resend(RESEND_API_KEY)

        // testing the email provider
        const {error} = await this.resend.apiKeys.list()

        if(error) throw error
    }
}

export const _ResendManager = new ResendManager()