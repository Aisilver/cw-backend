import cors from "cors";
import express from "express"
import cookieParser from 'cookie-parser'
import { CarrierEngine } from "../abs-classes/carrier-engine/carrier-engine.class.js";
import { _MainServerService } from "../services/server.service.js";
import { _AppRouteController } from "./controllers/app-route-controller/app-route.ctrl.js";
import { _AuthenticationRouteController } from "./controllers/auth-route-controller/auth-route.ctrl.js";


class ApiCarrierEngine extends CarrierEngine {
    BeforeInit(): Promise<void> | void {
        this.implementPrimaryMiddlewares()

        this.injectEngine(_AppRouteController)

        this.injectEngine(_AuthenticationRouteController)
    }

    private implementPrimaryMiddlewares () {
        const {PRIMARY_FRONTEND_URL} = _MainServerService

        //CORS

        this.app.use(cors({
            origin: [PRIMARY_FRONTEND_URL],
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            exposedHeaders: "x-encrypted-data",
            credentials: true
        }))

        // OTHER MIDDLEWARES

        this.app.use(express.json())

        this.app.use(cookieParser())

        console.log(PRIMARY_FRONTEND_URL)
    }
}

export const _ApiCarrierEngine = new ApiCarrierEngine("ApiCarrierEngine")