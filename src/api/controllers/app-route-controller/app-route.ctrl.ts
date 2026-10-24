import { RouteController } from "../../../abs-classes/route-controller/route-controller.class.js";
import { ApiSuccessResponse } from "../../../functions/api-response.func.js";
import { APP_RF_setClientPublicEncryptionKey } from "./route-funcs/set-client-public-enc-key.r-func.js";

class AppRouteController extends RouteController {
    protected routeBaseUri: string = "app";

    protected AfterRouteControllerInit?(): Promise<void> | void {
        this.Router.route("/ping").get((req, res) => res.json(ApiSuccessResponse("pong")))

        this.Router.route("/set-pub-key").post(APP_RF_setClientPublicEncryptionKey)
    }
    
}

export const _AppRouteController = new AppRouteController("AppRouteController")