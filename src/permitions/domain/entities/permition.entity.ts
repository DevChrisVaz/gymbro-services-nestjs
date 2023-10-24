import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IPermition extends ITimestamps {
    accessLevel: string;
    entity?: string;
    user: string;
    rol: string
}

export class Permition implements IPermition {
    accessLevel: string;
    entity?: string;
    user: string;
    rol: string
    createdAt?: string;
    updatedAt?: string;
}

export class SerializedPermition extends Permition {
    constructor(partial: Partial<SerializedPermition>) {
        super();
        Object.assign(this, partial);
    }
}