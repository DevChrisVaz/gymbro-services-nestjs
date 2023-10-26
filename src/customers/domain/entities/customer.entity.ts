import { Exclude } from 'class-transformer';

export interface ICustomer {
  user: string;
  email: string;
  phone: string;
  birthdate: Date;
  usedPasswords: string[];
  profilePicture: string;
}

export class Customer implements ICustomer {
  user: string;
  email: string;
  phone: string;
  birthdate: Date;
  usedPasswords: string[];
  profilePicture: string;
}

export class SerializedCustomer extends Customer {
  @Exclude()
  override user: string;

  @Exclude()
  override usedPasswords: string[];

  constructor(partial: Partial<SerializedCustomer>) {
    super();
    Object.assign(this, partial);
  }
}
