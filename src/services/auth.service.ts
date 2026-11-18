import { CacheManager } from "../abs-classes/cache-handler/cache-handler.class.js";
import { TIME_CONSTANT } from "../constants/time-in-seconds.const.js";

const { DAY } = TIME_CONSTANT

class AuthService extends CacheManager {

    protected namespace: string = "auth";

    ONLINE_USERS = this.SingleKeyCollection<string>("online-users", DAY * 7)

    CLIENT_ENCRYPTION_PUBLIC_KEYS = this.SingleKeyItem<string>("client-enc-pub-keys", DAY)
}

export const _AuthService = new AuthService()