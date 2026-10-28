import { CacheManager } from "../abs-classes/cache-manager/cache-manger.class.js";
import { TIME_CONSTANT } from "../constants/time-in-seconds.const.js";

const { DAY } = TIME_CONSTANT

class AuthService extends CacheManager {

    protected namespace: string = "auth";

    ONLINE_USERS = this.Collection<string>("online-users", DAY * 7)

    CLIENT_ENCRYPTION_PUBLIC_KEYS = this.SingleItem<string>("client-enc-pub-keys", DAY)
}

export const _AuthService = new AuthService()