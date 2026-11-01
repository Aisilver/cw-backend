import { RouteController } from "../../../abs-classes/route-controller/route-controller.class.js";
import { AUTH_RF_login } from "./route-functions/login.r-func.js";
import { AUTH_RF_signup } from "./route-functions/sign-up.r-func.js";

class AuthenticationRouteController extends RouteController {
    protected routeBaseUri: string = "auth";

    protected RegisterRoutes(): Promise<void> | void {
        this.Router.route("/sign-up").post(AUTH_RF_signup)

        this.Router.route("/login").post(AUTH_RF_login)
    }
}
 
export const _AuthenticationRouteController = new AuthenticationRouteController("AuthRouteController")