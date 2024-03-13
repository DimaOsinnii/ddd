import { DatabaseError } from 'pg';
import { UniqueConstraintError } from '../../../utils/errors/infrastructure/postgres';

const PG_ERROR_CODE = {
    UNIQUE_CONSTRAINT: '23505',
};

export function handleDatabaseError(error: unknown) {
    if (!(error instanceof DatabaseError)) throw error;

    if (error.code === PG_ERROR_CODE.UNIQUE_CONSTRAINT) {
        throw new UniqueConstraintError(error);
    }

    throw error;
}
