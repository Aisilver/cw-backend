import { config } from "dotenv";
import Joi from "joi";

config()

const EnvObjectValidation = Joi.object<NodeJS.ProcessEnv>({
    ENV: Joi.string().allow("development", "production").required(),

    SERVER_DOMAIN: Joi.string().required(),

    SERVER_PORT: Joi.string().required(),

    PRIMARY_FRONTEND_DOMAIN: Joi.string().required(),
    
    ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),

    REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),
})
.unknown(true)

.required()


export function ServerEnvValidator () {

    const {error} = EnvObjectValidation.validate(process.env)

    if(error) throw error.message
}