import { Exclude } from 'class-transformer';
import {
  ITimestamps,
  TTimestamps,
} from 'src/database/domain/entities/ITimestamps';

export interface IUser extends ITimestamps {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  usedPasswords: string[];
  phone: string;
  profilePicture: string;
  birthdate: Date;
  status: string;
  rol: string;
}

export type TUser = TTimestamps & {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  usedPasswords: string[];
  phone: string;
  profilePicture: string;
  birthdate: Date;
  status: string;
  rol: string;
};

export class User implements IUser {
  uuid: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  usedPasswords: string[];
  phone: string;
  profilePicture: string;
  birthdate: Date;
  status: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedUser implements IUser {
  uuid: string;

  firstName: string;

  lastName: string;

  userName: string;

  email: string;

  @Exclude()
  usedPasswords: string[];

  phone: string;

  profilePicture: string;

  birthdate: Date;

  status: string;

  rol: string;

  createdAt: string;

  updatedAt: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
