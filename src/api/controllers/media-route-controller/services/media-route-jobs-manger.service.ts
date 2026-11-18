import { DynamicKeyTaskManager } from "../../../../classes/dynamic-key-job-handler/dynamic-key-job-handler.class.js"
import { MEDIA_CRONJOB_deleteTempFile } from "../job-functions/delete-temp-file.j-func.js"

class MediaRouteControllerJobsManager {
    DELETE_TEMP_FILE = new DynamicKeyTaskManager("delete-temp-file", MEDIA_CRONJOB_deleteTempFile)
}

export const _MediaRouteControllerJobsManager = new MediaRouteControllerJobsManager()