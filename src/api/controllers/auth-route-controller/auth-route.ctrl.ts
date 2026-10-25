import { RouteController } from "../../../abs-classes/route-controller/route-controller.class.js";

class AuthenticationRouteController extends RouteController {
    protected routeBaseUri: string = "auth";

    protected RegisterRoutes(): Promise<void> | void {
        
    }
}

export const _AuthenticationRouteController = new AuthenticationRouteController("AuthRouteController")