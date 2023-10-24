import { ITimestamps } from 'src/database/domain/entities/ITimestamps';
import { AccessLevel } from '../enums/access-level.enum';

export interface IBranchManager extends ITimestamps {
    accessLevel: AccessLevel;
    branch: string;
    user: string;
    rol: string;
    status: string;
}

export class BranchManager implements IBranchManager {
    accessLevel: AccessLevel;
    branch: string;
    user: string;
    rol: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export class SerializedBranchManager extends BranchManager {
    constructor(partial: Partial<SerializedBranchManager>) {
        super();
        Object.assign(this, partial);
    }
}