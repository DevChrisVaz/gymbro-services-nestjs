import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IEquipment extends ITimestamps {
  uuid: string;
  name: string;
  description: string;
  image: string;
  qty: number;
  branch: string;
  status: string;
}

export class Equipment implements IEquipment {
  uuid: string;
  name: string;
  description: string;
  image: string;
  qty: number;
  status: string;
  branch: string;
  createdAt?: string;
  updatedAt?: string;
}
