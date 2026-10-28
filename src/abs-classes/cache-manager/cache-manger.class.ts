import { _RedisManger, type RedisManager } from "../../classes/redis-manger/redis-manager.js"

export abstract class CacheManager {
    private CacheClient: RedisManager

    protected abstract namespace: string

    private get REDIS () {
        return this.CacheClient.REDIS
    }

    constructor() {
        this.CacheClient = _RedisManger
    }

    private async findInCollection<Item> (collection_key: string, predicate: (item: Item) => boolean) {
        const collectionItems = await this.CacheClient.get<Item[]>(collection_key) ?? []

        return {
            collectionItems,

            itemIndex: collectionItems.findIndex(item => predicate(item)),
        }
    }

    private hasKey = async (key: string) => await this.REDIS.exists(key) > 0

    private deleteItem = async (key: string) => await this.REDIS.del(key)

    protected SingleItem <Item> (primaryKey: string, ttl: number) {
        const itemBaseKey = this.CacheClient.makeGroupedKey(this.namespace, primaryKey),

        keyExtParser = (keyExtension?: string) => keyExtension ? this.CacheClient.makeGroupedKey(itemBaseKey, keyExtension) : itemBaseKey

        return {
            get: (keyExtension?: string) => this.CacheClient.get(keyExtParser(keyExtension)),

            set: (item: Item, keyExtension?: string) => this.CacheClient.set(keyExtParser(keyExtension), item, ttl),

            exists: (keyExtension?: string) => this.hasKey(keyExtParser(keyExtension))
        }
    }

    protected Collection <Item>(collection_cache_key_name: string, ttl: number) {
        
        const collection_key = this.CacheClient.makeGroupedKey(this.namespace, collection_cache_key_name)

        return {
            set: (items: Item[]) => this.CacheClient.set(collection_key, items, ttl),
            
            get: () => this.CacheClient.get<Item[]>(collection_key),
            
            add: async (item: Item) => {
                const savedItems = await this.CacheClient.get<Item[]>(collection_key) ?? []
                    
                savedItems.push(item)

                await this.CacheClient.set(collection_key, savedItems, ttl)
            },

            findAndPop: async (predicate: (item: Item) => boolean) => {
                const {collectionItems, itemIndex} = await this.findInCollection(collection_key, predicate)

                if(itemIndex < 0) return undefined

                const foundItem = collectionItems[itemIndex]

                collectionItems.splice(itemIndex, 1)

                await this.CacheClient.set(collection_key, collectionItems, ttl)

                return foundItem
            },

            findAndReplace: async (predicate: (item: Item) => boolean, ...newItems: Item[]) => {
                const {collectionItems, itemIndex} = await this.findInCollection(collection_key, predicate)

                if(itemIndex < 0) return undefined

                collectionItems.splice(itemIndex, 1, ...newItems) 

                await this.CacheClient.set(collection_key, collectionItems, ttl)
            },

            find: async (predicate: (item: Item) => boolean) => {
                const list = await this.CacheClient.get<Item[]>(collection_key) ?? []
                
                for (const element of list) {
                    if(predicate(element)) return element
                }

                return null
            },

            exists: () => this.hasKey(collection_key),

            delete: () => this.deleteItem(collection_key)
        }
    }
}