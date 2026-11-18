import { EntityBase } from "./common";

export interface Enrollment extends EntityBase {
    studentId: string;

    productId: string;
}