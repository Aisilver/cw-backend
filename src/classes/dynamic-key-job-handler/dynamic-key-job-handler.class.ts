import { CronJobHandler } from "../cron-job-handler/cron-job-handler.class.js";


export class DynamicKeyTaskManager<TaskRunnerNeed = unknown, DynamicKey = (number | string)> {
    private taskManger = new CronJobHandler();

    private declare namespace: string

    private declare taskRunner: (args: TaskRunnerNeed) => void | Promise<void>

    constructor (namespace: string, taskRunner: (args: TaskRunnerNeed) => void | Promise<void>) {
        this.namespace = namespace

        this.taskRunner = taskRunner
    }

    addTask(dynamicKey: DynamicKey, jobParam: TaskRunnerNeed, whenToRun: Date) {
        this.taskManger.addTask({
            key: `${this.namespace}:${dynamicKey}`,

            schedule: whenToRun,
            
            task: () => {
                this.taskRunner(jobParam)
            }
        })
    }

    addTaskWithSameDynamicKeyAndJobParam (dynamicKey: DynamicKey, whenToRun: Date){
        this.addTask(dynamicKey, dynamicKey as any, whenToRun)
    }

    async killTask (dynamicKeyPart: DynamicKey) {
        const jobKey = `${this.namespace}:${dynamicKeyPart}`

        await this.taskManger.killJob(jobKey)
    }
}