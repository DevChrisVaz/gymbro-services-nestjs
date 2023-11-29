import { Exclude } from 'class-transformer';

export interface ICustomer {
  person: string;
  email: string;
  phone: string;
  birthdate: Date;
  usedPasswords: string[];
  profilePicture: string;
}

export interface ICustomerWithPassword extends ICustomer {
  password: string;
}

export class Customer implements ICustomer {
  person: string;
  email: string;
  phone: string;
  birthdate: Date;
  usedPasswords: string[];
  profilePicture: string;
}

export class SerializedCustomer extends Customer {
  @Exclude()
  override person: string;

  @Exclude()
  override usedPasswords: string[];

  constructor(partial: Partial<SerializedCustomer>) {
    super();
    Object.assign(this, partial);
  }
}
