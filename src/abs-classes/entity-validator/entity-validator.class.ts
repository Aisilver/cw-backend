import type { EntityBase } from "@shared/entities/common/entity-base.js";
import type Joi from "joi";

export abstract class EntityValidator<Schema> {
    protected abstract schemaValidationObj: Joi.ObjectSchema<Schema & EntityBase>

    get SchemaObject () {
        return this.schemaValidationObj
    }

    validate (body: Schema) {
        return this.schemaValidationObj
        
        .required()

        .unknown(true)

        .validate(body)
    }
} 