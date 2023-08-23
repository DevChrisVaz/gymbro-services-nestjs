import { ITimestamps } from "src/database/domain/entities/ITimestamps";


export interface IGym extends ITimestamps {
    uuid?: string;
    name?: string;
    description?: string;
    logo?: string;
    address?: string;
    status?: string;
}

export class Gym implements IGym {
    uuid?: string;
    name?: string;
    description?: string;
    logo?: string;
    address?: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
}
