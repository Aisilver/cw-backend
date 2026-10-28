import { _ApiCarrierEngine } from "./api/api-engine.js";
import { _ServerBoostrapEngine } from "./bootstrap/bootstrap.engine.class.js";
import { MainEngine } from "./classes/main/main.class.js";

const Main = new MainEngine();

Main.injectEngine(_ServerBoostrapEngine);

Main.injectEngine(_ApiCarrierEngine);

(async () => {

    try{
        await Main.InitializeAllEngines()

        Main.Start(async () => {})

    } catch {
        Main.LogError()
    }

}) ();