import { EntityBase } from "./common/entity-base";

export type UserMaritalStatusTypes = "married" | "single"

export type UserGenderStatusTypes = "male" | "female"

export interface User extends EntityBase {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: UserGenderStatusTypes;
    maritalStatus: UserMaritalStatusTypes;
    accountId?: string
}