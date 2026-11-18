import { Roles } from "../../common"
import { Account, User } from "../../entities"

export type SignUpRequestData = {
    role: Roles,
    user: User,
    account: Account,
    profileImageRef?: string
}