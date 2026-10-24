import type { Request, Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../../functions/api-response.func.js";
import Joi from "joi";

export function APP_RF_setClientPublicEncryptionKey (req: Request, res: Response) {
    try {
        
        const {public_key} = req.body as {public_key: string},

        {error} = Joi.string().required().validate(public_key)

        if(error) throw error

        // Continue

        res.json(ApiSuccessResponse())

    } catch (error: any) {
        res.json(ApiFailureResponse(error.message))
    }
}