import { CacheManager } from "../../../../abs-classes/cache-handler/cache-handler.class.js";
import { TIME_CONSTANT } from "../../../../constants/time-in-seconds.const.js";

const {HOUR} = TIME_CONSTANT

class MediaRouteControllerCachemanager extends CacheManager {
    protected namespace: string = "media";
    
    TEMP_FILES_CACHE = this.SingleKeyItem<string>("temp-files", HOUR)
}

export const _MediaRouteControllerCachemanager = new MediaRouteControllerCachemanager()