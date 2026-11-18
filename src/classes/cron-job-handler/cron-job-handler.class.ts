import nodeCron, { type ScheduledTask } from "node-cron";

interface JobConfig {
  key: string;
  schedule: Date;
  task (): Promise<void> | void;
}

export class CronJobHandler {
    private JobsMap = new Map<string, ScheduledTask>()

    private dateToUTCCronExpression (date: Date) {
        const newDate = new Date(date),
        
        minute = newDate.getUTCMinutes(),
        
        hour = newDate.getUTCHours(), 
        
        day_of_month = newDate.getUTCDate(),
        
        month = newDate.getUTCMonth(), 
        
        day_of_week = newDate.getUTCDay()

        return `${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`
    }

    addTask (config: JobConfig) {
        const {key, schedule, task} = config

        if(this.JobsMap.has(key)) throw Error("Duplicate job are not allowed")

        const scheduleExpression = this.dateToUTCCronExpression(schedule),
        
        newJob = nodeCron.schedule(scheduleExpression, async () => {task()}, {maxExecutions: 1})

        this.JobsMap.set(key, newJob)
    }

    async killJob (key: string) {
        const job = this.JobsMap.get(key)

        await job?.destroy()

        this.JobsMap.delete(key)
    }
}