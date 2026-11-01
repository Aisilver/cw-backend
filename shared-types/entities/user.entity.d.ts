import { EntityBase } from "./common/entity-base";

export type UserMaritalStatusTypes = "married" | "single"

export type UserGenderStatusTypes = "male" | "female"

export interface UserEntity extends EntityBase {
    firstName: string;
    lastName: string;
    middleName?: string;
    email?: string;
    verifiedEmail: boolean;
    DOB: Date;
    gender: UserGenderStatusTypes;
    maritalStatus: UserMaritalStatusTypes;
    teacherId?: string;
    studentId?: string;
    parentId?: string;
}