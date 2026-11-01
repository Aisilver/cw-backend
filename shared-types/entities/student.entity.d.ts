import { EntityBase } from "./common";

export interface StudentEntity extends EntityBase {
    userId: string;
    parentId?: string;
}