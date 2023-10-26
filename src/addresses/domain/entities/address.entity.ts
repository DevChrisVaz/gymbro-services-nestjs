import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IAddress extends ITimestamps {
  uuid: string;
  street: string;
  building: string;
  zip: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  status: string;
}

export class Address implements IAddress {
  uuid: string;
  street: string;
  building: string;
  zip: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedAddress extends Address {
  constructor(partial: Partial<SerializedAddress>) {
    super();
    Object.assign(this, partial);
  }
}
