import type { Document } from "mongodb"
import { _DatabaseManger } from "./database-manager.class.js"
import type { CollectionTypeDefinition } from "@shared/entities/common/collection-type-def.js"

class CollectionsManager {
    private CollectionsNameDefinition: Record<keyof CollectionTypeDefinition, boolean> = {
        users: true,
        
        teachers: true,

        account: true,
        
        parents: true,

        admins: true,
 
        students: true,

        media: true,

        lessons: true,

        enrollments: true
    }

    async InitializeCollections () {
        const { DB } = _DatabaseManger
            
        for (const collectionName in this.CollectionsNameDefinition) {
            const collectionExists = await DB.listCollections({name: collectionName}, {nameOnly: true}).hasNext()

            if(!collectionExists)
               await DB.createCollection(collectionName)
        }
    }

    collection<K extends keyof CollectionTypeDefinition>(collectionName: K) {
        return _DatabaseManger.DB.collection<CollectionTypeDefinition[K]>(collectionName)
    }
}

export const _CollectionsManager = new CollectionsManager()