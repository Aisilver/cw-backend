import { Account } from "./account.entity";
import { EntityBase } from "./common";
import { Student } from "./student.entity";

export interface Parent extends EntityBase {
    children?: Student[]

    account: Account;
    accountId: string;
}