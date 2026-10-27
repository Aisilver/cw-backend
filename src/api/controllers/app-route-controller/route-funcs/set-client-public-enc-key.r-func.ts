import type { Request, Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../../functions/api-response.func.js";
import Joi from "joi";
import type { ClientPublicKeyRegistrationRequest } from "@shared/routes/app-route/client-public-key-registration.type.js";

export function APP_RF_setClientPublicEncryptionKey (req: Request, res: Response) {
    try {
        
        const {error, value} = Joi.object<ClientPublicKeyRegistrationRequest>({
            clientId: Joi.string().required(),

            publicKey: Joi.string().required()
        }).validate(req.body)

        if(error) throw error

        const {clientId, publicKey} = value
        
        // Continue

        res.json(ApiSuccessResponse())

    } catch (error: any) {
        res.json(ApiFailureResponse(error.message))
    }
}