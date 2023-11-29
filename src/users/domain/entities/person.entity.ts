import { Exclude } from 'class-transformer';
import {
  ITimestamps,
  TTimestamps,
} from 'src/database/domain/entities/ITimestamps';

export interface IPerson extends ITimestamps {
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status: string;
}

export type TPerson = TTimestamps & {
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status: string;
};

export class Person implements IPerson {
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedPerson extends Person {
  @Exclude({ toPlainOnly: true })
  status: string;

  constructor(partial: Partial<SerializedPerson>) {
    super();
    Object.assign(this, partial);
  }
}
