import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IBranchManager extends ITimestamps {
    branch: string;
    user: string;
    rol: string;
    status: string;
}

export class BranchManager implements IBranchManager {
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
