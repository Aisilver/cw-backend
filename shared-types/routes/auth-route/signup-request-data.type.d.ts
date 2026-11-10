import { Roles } from "../../common"
import { User } from "../../entities"

export type SignUpRequestData = {
    role: Roles,
    user: User
}