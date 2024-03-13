import type { Nullable } from '@utils/types';

export interface BaseDataAccess<Entity, T = Entity> {
    create: (entity: T) => Promise<Entity>;
    findById: (id: number) => Promise<Nullable<Entity>>;
    // updateById: (id: number, entity: Entity) => Promise<Entity>;
    // deleteById: (id: number) => Promise<void>;
}
