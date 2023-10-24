import { Exclude } from 'class-transformer';
import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IGymManager extends ITimestamps {
    gym: string;
    user: string;
    rol: string;
    status: string;
}

export class GymManager implements IGymManager {
    gym: string;
    user: string;
    rol: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export class SerializedGymManager extends GymManager {
    constructor(partial: Partial<SerializedGymManager>) {
        super();
        Object.assign(this, partial);
    }
}
