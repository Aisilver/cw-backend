import { RouteController } from "../../../abs-classes/route-controller/route-controller.class.js";
import { APP_GENERAL_SETTINGS } from "../../../configurations/app-settings.config.js";
import { MEDIA_RF_tempImgUpload } from "./route-functions/temp-img-upload.r-func.js";
import multer from "multer";

class MediaRouteController extends RouteController {
    private declare uplaod: multer.Multer

    protected routeBaseUri: string = "media";

    protected BeforeRouteControllerInit(): Promise<void> | void {
        const {maxImageSizeInMB} = APP_GENERAL_SETTINGS
        
        this.uplaod = multer({
            storage: multer.memoryStorage(),
            limits: {
                fieldSize: maxImageSizeInMB
            }
        })   
    }

    protected RegisterRoutes(): Promise<void> | void {
        this.Router.route("/temp-img-upload").post(this.uplaod.single("file"), MEDIA_RF_tempImgUpload)
    }
}

export const _MediaRouteController = new MediaRouteController("MediaRouteController")