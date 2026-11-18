import type { Request, Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../functions/api-response.func.js";
import { FileHandler } from "../../../../classes/file-handler/file-handler.class.js";
import { _MediaRouteControllerCachemanager } from "../services/media-route-cache-manager.service.js";
import { _MediaRouteControllerJobsManager } from "../services/media-route-jobs-manger.service.js";
import { addHours } from "date-fns";
import { randomUUID } from "node:crypto";


export async function MEDIA_RF_tempImgUpload (req: Request, res: Response) {
    try {
        const handler = new FileHandler(),

        {file} = req,

        {TEMP_FILES_CACHE} = _MediaRouteControllerCachemanager,

        {DELETE_TEMP_FILE} = _MediaRouteControllerJobsManager

        if(!file) throw Error("file cannot be found")

        //Save file to temp folder
        const tempFileName = await handler.saveFileToTemp(file),

        fileRef = randomUUID()

        //Cache file name with ref
        await TEMP_FILES_CACHE.set(tempFileName, fileRef)

        // Set Job to delete temp file after an hour
        DELETE_TEMP_FILE.addTaskWithSameDynamicKeyAndJobParam(tempFileName, addHours(new Date(), 1))

        res.json(ApiSuccessResponse(fileRef))

    } catch (error: any) {
        res.json(ApiFailureResponse(error.message))
    }
}