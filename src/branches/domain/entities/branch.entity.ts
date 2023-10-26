import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IBranch extends ITimestamps {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  socialMedia?: [string];
  operatingHours?: [string];
  policies?: [string];
  rules?: [string];
  gym: string;
  logo: string;
  status: string;
}

export class Branch implements IBranch {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  socialMedia?: [string];
  operatingHours?: [string];
  policies?: [string];
  rules?: [string];
  gym: string;
  logo: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedBranch extends Branch {
  constructor(partial: Partial<SerializedBranch>) {
    super();
    Object.assign(this, partial);
  }
}
