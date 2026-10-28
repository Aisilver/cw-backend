declare global {

    namespace NodeJS {

        interface ProcessEnv {
            // # SERVER VALUES

            ENV: "development" | "production";

            SERVER_PORT: string;

            SERVER_DOMAIN: string;

            ACCESS_TOKEN_SECRET_KEY: string;

            REFRESH_TOKEN_SECRET_KEY: string;

            //# DOMAINS

            PRIMARY_FRONTEND_DOMAIN: string;

            //# REDIS

            REDIS_URL: string
        }

    }

}

export {}