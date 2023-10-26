import { Exclude } from 'class-transformer';
import {
  ITimestamps,
  TTimestamps,
} from 'src/database/domain/entities/ITimestamps';

export interface IUser extends ITimestamps {
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status: string;
}

export type TUser = TTimestamps & {
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status: string;
};

export class User implements IUser {
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedUser extends User {
  @Exclude({ toPlainOnly: true })
  status: string;

  constructor(partial: Partial<SerializedUser>) {
    super();
    Object.assign(this, partial);
  }
}
