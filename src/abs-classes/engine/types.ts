export type EngineTask = {
    name: string,
    priority: "critical" | "passive",
    task(): void | Promise<void>
}