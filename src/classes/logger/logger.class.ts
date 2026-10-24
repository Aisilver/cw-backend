import {green, gray, yellow, red, type Color} from 'colorette'

type LoggerInfoLevelTypes = "success" | "info" | "error" | "warning"

export class Logger {
    private declare namespace: string

    constructor (namespace: string) {
        this.namespace = namespace
    }

    log(message: string, level: LoggerInfoLevelTypes = 'info') {
        const timeStamp = this.textColorizer(new Date().toISOString()),

        levelText = this.textColorizer(level.toUpperCase(), level),

        logMessage = `[${timeStamp}] [${levelText}] [${this.namespace}] [${message}].`

        this.printer(logMessage)
    }

    private textColorizer (text: string, level?: LoggerInfoLevelTypes) {
        let color: Color 

        switch(level) {
            case 'success': color = green
            break

            case 'warning': color = yellow
            break

            case 'error': color = red
            break

            default: color = gray
        }

        return color(text)
    }

    private printer (message: string) {
        console.log()
        console.log(message)
        console.log()
    }
}