import dotenv from 'dotenv';
import path from 'node:path';

import zod from 'zod';
import { parseEnv, port } from 'znv';
import { NODE_ENV } from '@utils/constants';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

export default parseEnv(process.env, {
    NODE_ENV: zod.string().default(NODE_ENV.DEV),
    PORT: port().default(8003),
    DB_PORT: zod.number().default(5433),
    DB_NAME: zod.string(),
    DB_HOST: zod.string(),
    DB_USER: zod.string(),
    DB_PASSWORD: zod.string(),
    DATABASE_URL: zod.string(),
});
