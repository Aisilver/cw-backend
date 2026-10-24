import { Engine } from "../engine/engine.class.js";

export abstract class CarrierEngine extends Engine {
    protected engines: Engine[] = [];

    AfterCarrierInit?(): void | Promise<void>

    injectEngine = (engine: Engine) => this.engines.push(engine)

    async AfterInit(): Promise<void> {
        for (const engine of this.engines) {

            try {

                this.logger.log(`Initializing {${engine.name}}`)

                await engine.Initialize(this.app, this.server)

                this.logger.log(`{${engine.name}} Initialized successfully`, "success")

            } catch (error: any) {
                throw new Error(`{${engine.name} Error: ${error.message}`)
            }
        }

        if(this.AfterCarrierInit) this.AfterCarrierInit()
    }
}