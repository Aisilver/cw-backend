import { config } from "dotenv";
import { Engine } from "../abs-classes/engine/engine.class.js";
import { _RedisManger } from "../classes/redis-manager/redis-manager.js";
import { _CollectionsManager } from "../database/classes/collections-manager.class.js";
import { _DatabaseManger } from "../database/classes/database-manager.class.js";
import { _MainServerService } from "../services/server.service.js";
import { BOOTSTRAP_FUNC_envVariblesValiation } from "./bootstrap-functions/env-variables-validation.btrsp.js";
import { _ResendManager } from "../classes/resend-manager/resend-manager.class.js";

config()
class BootstrapEngine extends Engine {
    BeforeInit(): Promise<void> | void {
        const {ENV} = process.env

        this.registerInitTask({
            name: "ENV variables validation",
            priority: "critical",
            task: BOOTSTRAP_FUNC_envVariblesValiation
        })

        this.registerInitTask({
            name: "redis setup",
            priority: "critical",
            async task(){
                await _RedisManger.initializeRedis()
            }
        })

        this.registerInitTask({
            name: "database bootstrap",
            priority: "critical",
            async task() {
                await _DatabaseManger.Initialize()
            }
        })

        this.registerInitTask({
            name: "collections initialization",
            priority: "critical",
            async task () {
                await _CollectionsManager.InitializeCollections()
            }
        })

        this.registerInitTask({
            name: "resend email initialization",
            priority: ENV == "production" ? "critical" : "passive",
            async task() {
                await _ResendManager.Initialize()
            }
        })
    }
}

export const _ServerBoostrapEngine = new BootstrapEngine("Bootstrap")