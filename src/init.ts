import { _ApiCarrierEngine } from "./api/api-engine.js";
import { MainEngine } from "./classes/main/main.class.js";

const Main = new MainEngine()

Main.injectEngine(_ApiCarrierEngine)

Main.Start()