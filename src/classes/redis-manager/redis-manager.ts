import { config } from "dotenv"
import { Redis } from "ioredis"
import { TIME_CONSTANT } from "../../constants/time-in-seconds.const.js"

config()

const { DAY } = TIME_CONSTANT

export class RedisManager {
    private declare redis: Redis

    get REDIS () {
        if(this.redis.status !== "ready") 
            throw Error(`redis is not ready, current status: ${this.redis.status}`)

        return this.redis
    }

    async initializeRedis () {
        await new Promise<void>((res, rej) => {
            const {REDIS_URL} = process.env

            this.redis = new Redis(REDIS_URL)

            this.redis.on("ready", () => res())

            this.redis.on("error", () => rej())
        })

        await this.redis.flushall();
    }

    async set(key: string, value: any, ttlSeconds: number = DAY) {
        const seralize = typeof value == "string" ? value : JSON.stringify(value)
        
        await this.REDIS.set(key, seralize, "EX", ttlSeconds)
    }

    async get<T = unknown>(key: string){
        const data = await this.REDIS.get(key)

        if(!data) return null

        else{
            try {
                return JSON.parse(data) as T
            } catch {
                return data as T
            }
        }
    }

    makeGroupedKey(mainKey: string, ...keys: string[]){
        if(keys.length > 1)
            return `${mainKey}:${keys.join(":")}`
        else if(keys.length == 1)
            return `${mainKey}:${keys[0]}`
        else
            throw Error(`keys must be more than or equal to one, got ${keys.length} keys`)       
    }

}

export const _RedisManger = new RedisManager()