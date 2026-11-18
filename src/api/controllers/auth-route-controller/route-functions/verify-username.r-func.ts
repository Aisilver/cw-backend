import type { Request, Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../functions/api-response.func.js";
import Joi from "joi";
import { _CollectionsManager } from "../../../../database/classes/collections-manager.class.js";

export async function AUTH_RF_verifyUsername (req: Request, res: Response) {
    try {
        const {error, value: username} = Joi.string().required().validate(req.params['username'])

        if(error) throw error

        const foundAccount = await _CollectionsManager.collection("account").findOne({username}, {projection: {_id: 1}})

        console.log(foundAccount)

        res.json(ApiSuccessResponse({exists: foundAccount != null}))

    } catch (error: any) {
        res.json(ApiFailureResponse(error.message))
    }
}