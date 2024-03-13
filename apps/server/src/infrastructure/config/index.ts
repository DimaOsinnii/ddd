import env from '@infrastructure/config/parsedEnv';
import type { AppConfig } from './types';

const config: AppConfig = {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        name: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
    },
};

export default config;
