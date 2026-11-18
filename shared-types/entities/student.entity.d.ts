import { Account } from "./account.entity";
import { EntityBase } from "./common";
import { Mylesson } from "./enrolment.entity";
import { Parent } from "./parent.entity";

export interface Student extends EntityBase {
    myLessons?: Mylesson []

    account?: Account;
    accountId?: string;

    parent?: Parent;
    parentId?: string;
}