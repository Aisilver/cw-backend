import { EntityBase } from "./common";

export interface Student extends EntityBase {
    userId: string;
    parentId?: string;
}