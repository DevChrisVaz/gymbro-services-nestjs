import { Exclude } from 'class-transformer';

export interface IGYMUser {
  user: string;
  userName: string;
  usedPasswords: string[];
  gym: string;
  rol: string;
}

export class GYMUser implements IGYMUser {
  user: string;
  userName: string;
  usedPasswords: string[];
  gym: string;
  rol: string;
}

export class SerializedGYMUser extends GYMUser {
  @Exclude()
  override user: string;

  @Exclude()
  override usedPasswords: string[];

  constructor(partial: Partial<SerializedGYMUser>) {
    super();
    Object.assign(this, partial);
  }
}
