import { Exclude } from 'class-transformer';
import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IAuth extends ITimestamps {
  ref: string;
  userName: string;
  password: string;
}

export class Auth implements IAuth {
  ref: string;
  userName: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedAuth implements IAuth {
  @Exclude()
  ref: string;
  userName: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(partial: Partial<SerializedAuth>) {
    Object.assign(this, partial);
  }
}
