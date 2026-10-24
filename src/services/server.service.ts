import { config } from "dotenv"

config()

class MainServerService {
    get HTTP_PREFIX () {
        const {ENV} = process.env

        if(ENV == "development") return "http://"

        else return "https://"
    }

    get PRIMARY_FRONTEND_URL () {
        const {PRIMARY_FRONTEND_DOMAIN} = process.env

        return `${this.HTTP_PREFIX}${PRIMARY_FRONTEND_DOMAIN}`
    }

    get SERVER_URL () {
        const {SERVER_DOMAIN} = process.env

        return `${this.HTTP_PREFIX}${SERVER_DOMAIN}`
    }
}

export const _MainServerService = new MainServerService()