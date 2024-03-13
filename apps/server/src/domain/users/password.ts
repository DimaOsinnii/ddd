import type { Password } from '@domain/users/types';
import crypto from 'node:crypto';

export function createUserPassword(value: string, hashed = false): Password {
    return {
        value,
        hashed,
    };
}

// The following functions is adapted from the `metautil` library under the MIT License.
// Source: https://github.com/metarhia/metautil/blob/master/lib/crypto.js
const HASH_PARTS = 5;
const SALT_LEN = 32;
const KEY_LEN = 64;
// Only change these if you know what you're doing
const SCRYPT_PARAMS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SCRYPT_PREFIX = '$scrypt$N=32768,r=8,p=1,maxmem=67108864$';

export function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(SALT_LEN, (err, salt) => {
            if (err) return void reject(err);
            crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
                if (err) return void reject(err);
                resolve(serializeHash(hash, salt));
            });
        });
    });
}

export function validatePassword(password: string, serializedHash: string): Promise<boolean> {
    const { params, salt, hash } = deserializeHash(serializedHash);
    return new Promise((resolve, reject) => {
        const callback = (err: Error | null, hashedPassword: Buffer) => {
            if (err) return void reject(err);
            resolve(crypto.timingSafeEqual(hashedPassword, hash));
        };
        crypto.scrypt(password, salt, hash.length, params, callback);
    });
}

function serializeHash(hash: Buffer, salt: Buffer) {
    const saltString = salt.toString('base64').split('=')[0];
    const hashString = hash.toString('base64').split('=')[0];
    return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
}

function deserializeHash(phcString = '') {
    const parts = phcString.split('$');

    if (parts.length !== HASH_PARTS) {
        throw new Error('Invalid format; Expected $name$options$salt$hash');
    }
    const [, name, options, salt64, hash64] = parts;

    if (name !== 'scrypt') {
        throw new Error('Node.js crypto module only supports scrypt');
    }

    const params = parseOptions(options);
    const salt = Buffer.from(salt64 as string, 'base64');
    const hash = Buffer.from(hash64 as string, 'base64');
    return { params, salt, hash };
}

function parseOptions(options = '') {
    const values = [];
    const items = options.split(',');

    for (const item of items) {
        const [key, val] = item.split('=');
        values.push([key, Number(val)]);
    }

    return Object.fromEntries(values) as Record<string, number>;
}
