import { config } from "dotenv";
import Joi from "joi";

config()

export function BOOTSTRAP_FUNC_envVariblesValiation () {

    const validation = Joi.object<NodeJS.ProcessEnv>({
    
        ENV: Joi.string().allow("development", "production").required(),

        SERVER_DOMAIN: Joi.string().required(),

        SERVER_PORT: Joi.string().required(),

        PRIMARY_FRONTEND_DOMAIN: Joi.string().required(),
        
        ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),

        REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),

        REDIS_URL: Joi.string().required()
    })
    .unknown(true)

    .required(),
    
    
    {error} = validation.validate(process.env)

    if(error) throw error.message
}