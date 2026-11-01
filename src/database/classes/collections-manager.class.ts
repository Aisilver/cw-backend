import type { Document } from "mongodb"
import { _DatabaseManger } from "./database-manager.class.js"
import type { CollectionTypeDefinition } from "@shared/entities/common/collection-type-def.js"

class CollectionsManager {
    private CollectionsNameDefinition: Record<keyof CollectionTypeDefinition, boolean>= {
        users: true,
        
        teachers: true,
        
        lessons: true,

        parents: true,

        admins: true,
 
        students: true,

        enrollments: true
    }

    async InitializeCollections () {
        for (const collectionName in this.CollectionsNameDefinition) {
            const { DB } = _DatabaseManger,
            
            collectionExists = await DB.listCollections({name: collectionName}, {nameOnly: true}).hasNext()

            if(!collectionExists)
               await DB.createCollection(collectionName)
        }
    }

    collection<K extends keyof CollectionTypeDefinition>(collectionName: keyof CollectionTypeDefinition) {
        return _DatabaseManger.DB.collection<Document & CollectionTypeDefinition[K]>(collectionName)
    }
}

export const _CollectionsManager = new CollectionsManager()