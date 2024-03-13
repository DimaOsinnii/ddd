import type { DatabaseError } from 'pg';

const UNIQUE_REGEX = /\((.*?)\)=\((.*?)\)/;

export class UniqueConstraintError extends Error {
    public column?: string;
    public value?: string;
    public table?: string;
    public constraint?: string;

    constructor(error: DatabaseError) {
        super(error.message);

        this.table = error.table;
        this.constraint = error.constraint;

        this.parseDetail(error.detail);
    }

    private parseDetail(detail?: string) {
        if (!detail) return;

        const matches = detail.match(UNIQUE_REGEX);

        if (!matches) return;

        const [, columnName, columnValue] = matches;

        this.column = columnName;
        this.value = columnValue;
    }
}
