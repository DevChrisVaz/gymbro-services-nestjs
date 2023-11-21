import { ITimestamps } from "src/database/domain/entities/ITimestamps";

export interface IEquipment extends ITimestamps {
    name: string;
    description: string;
    image: string;
    qty: number;
    status: string;
}

export class Equipment implements IEquipment {
    name: string;
    description: string;
    image: string;
    qty: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}
