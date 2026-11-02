import { RouteController } from "../../../abs-classes/route-controller/route-controller.class.js";
import express from 'express';
import { WEBHOOK_RF_resendEmailWebhookHandler } from "./route-functions/email-events-handler.r-func.js";

class WebHookRouteController extends RouteController {
    protected routeBaseUri: string = "webhook";

    protected RegisterRoutes(): Promise<void> | void {
        this.Router.route("/email").post(express.raw({ type: "application/json" }), WEBHOOK_RF_resendEmailWebhookHandler)
    }
}

export const _WebHookRouteController = new WebHookRouteController("WebHookRouteController")