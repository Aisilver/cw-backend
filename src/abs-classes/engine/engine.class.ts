import type { Express } from "express";
import type { Server } from "http";
import { Logger } from "../../classes/logger/logger.class.js";
import type { EngineTask } from "./types.js";

export abstract class Engine {
    protected declare logger: Logger;

    protected declare app: Express;

    protected declare server: Server;

    private initTasks: EngineTask [] = [];

    declare name: string

    constructor (namespace: string) {
        this.name = namespace

        this.logger = new Logger(this.name)
    }

    AfterInit?(): Promise<void> | void

    BeforeInit?(): Promise<void> | void

    async Initialize (app: Express, server: Server) {
        this.app = app

        this.server = server

        if(this.BeforeInit) await this.BeforeInit()

        await this.InitTaskHandler()

        if(this.AfterInit) await this.AfterInit()
    }

    registerTask = (enginetask: EngineTask) => this.initTasks.push(enginetask)

    private async InitTaskHandler () {
        for (const task of this.initTasks ?? []) {

            const {name, priority, task: taskToRun} = task

            try {
                this.logger.log(`Executing [${name}] task.`)
                
                await taskToRun()

                this.logger.log(`[${name}] has executed succesfully`, 'success')
            } catch (error: any) {
                if(priority !== "critical") throw error

                this.logger.log(`Failed to execute [${name}] cause "${error.message}" and has been overlooked`, 'warning')     
            }           
        }
    }
}