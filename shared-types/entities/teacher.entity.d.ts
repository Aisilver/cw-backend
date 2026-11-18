import { Account } from "./account.entity";
import { EntityBase } from "./common";
import { Product } from "./product.entity";

export interface Teacher extends EntityBase {
    lesson?: Product;
    lessonId?: string;
    
    account?: Account;
    accountId?: string;
}