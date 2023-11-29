import { Exclude } from 'class-transformer';
import {
  ITimestamps,
  TTimestamps,
} from 'src/database/domain/entities/ITimestamps';

export interface IUser extends ITimestamps {
  person: string;
  userName: string;
  usedPasswords: string[];
}

export type TUser = TTimestamps & {
  person: string;
  userName: string;
  usedPasswords: string[];
};

export class User implements IUser {
  person: string;
  userName: string;
  usedPasswords: string[];
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedUser extends User {
  @Exclude()
  override usedPasswords: string[];

  constructor(partial: Partial<SerializedUser>) {
    super();
    Object.assign(this, partial);
  }
}
