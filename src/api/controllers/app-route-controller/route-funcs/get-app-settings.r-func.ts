import type { Request, Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../functions/api-response.func.js";
import { APP_GENERAL_SETTINGS } from "../../../../configurations/app-settings.config.js";

export function APP_RF_getAppSettings (req: Request, res: Response) {
    try {
        res.json(ApiSuccessResponse(APP_GENERAL_SETTINGS))
    } catch (error: any) {
        res.json(ApiFailureResponse(error.message))
    }
}