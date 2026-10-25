import { Router } from "express";
import { Engine } from "../engine/engine.class.js";
import { JWTMiddleWareHandler } from "../../middlewares/jwt.middleware.js";

type MiddlwareOptions = {
    useJwtMiddleware?: boolean
}

export abstract class RouteController extends Engine {
    private declare middlewareOptions: MiddlwareOptions

    protected abstract routeBaseUri: string

    protected Router = Router()

    protected AfterRouteControllerInit(): Promise<void> | void {}

    protected abstract RegisterRoutes(): Promise<void> | void

    constructor(namespace: string, midwareOpts?: MiddlwareOptions) {
        super(namespace)

        this.middlewareOptions = midwareOpts ?? {}
    }

    BeforeInit(): Promise<void> | void {
        if(this.middlewareOptions.useJwtMiddleware) this.Router.use(JWTMiddleWareHandler)

        this.RegisterRoutes()
    }

    AfterInit(): Promise<void> | void {
        this.app.use(`/${this.routeBaseUri}`, this.Router)

        if(this.AfterRouteControllerInit) this.AfterRouteControllerInit()
    }
}