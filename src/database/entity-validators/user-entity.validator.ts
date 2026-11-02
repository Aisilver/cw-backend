import Joi from "joi";
import { EntityValidator } from "../../abs-classes/entity-validator/entity-validator.class.js";
import type { EntityBase } from "@shared/entities/common/entity-base.js";
import type { UserEntity } from "@shared/entities/user.entity.js";

class UserEntityValidator extends EntityValidator<UserEntity> {
    protected schemaValidationObj: Joi.ObjectSchema<UserEntity & EntityBase> = Joi.object({
        _id: Joi.string().optional(),
        
        firstName: Joi.string().required(),
        
        lastName: Joi.string().required(),
        
        middleName: Joi.string().optional(),
        
        email: Joi.string().optional(),
        
        maritalStatus: Joi.string().allow([ "married" , "single"]).required(),
        
        gender: Joi.string().allow([ "married" , "single"]).required(),
        
        createdAt: Joi.date().optional()
    });
}

export const _USER_ENTITY_VALIDATOR = new UserEntityValidator()