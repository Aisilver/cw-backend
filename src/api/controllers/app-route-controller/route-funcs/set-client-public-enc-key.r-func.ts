import type { Request, Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../functions/api-response.func.js";
import Joi from "joi";
import { _AuthService } from "../../../../services/auth.service.js";
import type { ClientPublicKeyRegistrationRequest } from "@shared/routes/app-route/client-public-key-registration.type.js";

export async function APP_RF_setClientPublicEncryptionKey (req: Request, res: Response) {
    try {
        const {CLIENT_ENCRYPTION_PUBLIC_KEYS} = _AuthService, 
        
        {error, value} = Joi.object<ClientPublicKeyRegistrationRequest>({
            clientId: Joi.string().required(),

            publicKey: Joi.string().required()
        }).required().validate(req.body)

        if(error) throw error

        const {clientId, publicKey} = value
        
        await CLIENT_ENCRYPTION_PUBLIC_KEYS.set(publicKey, clientId)

        res.json(ApiSuccessResponse())

    } catch (error: any) {
        res.json(ApiFailureResponse(error.message))
    }
}