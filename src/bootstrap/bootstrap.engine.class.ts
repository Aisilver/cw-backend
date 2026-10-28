import { Engine } from "../abs-classes/engine/engine.class.js";
import { _RedisManger } from "../classes/redis-manger/redis-manager.js";
import { _MainServerService } from "../services/server.service.js";
import { BOOTSTRAP_FUNC_envVariblesValiation } from "./bootstrap-functions/env-variables-validation.btrsp.js";

class BootstrapEngine extends Engine {
    BeforeInit(): Promise<void> | void {
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
    }
}

export const _ServerBoostrapEngine = new BootstrapEngine("Bootstrap")