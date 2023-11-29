import { Exclude } from 'class-transformer';
import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IGym extends ITimestamps {
  uuid: string;
  name: string;
  description: string;
  email: string;
  logo: string;
  status: string;
}

export class Gym implements IGym {
  uuid: string;
  name: string;
  description: string;
  email: string;
  logo: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedGym extends Gym {
  @Exclude()
  override status: string;

  constructor(partial: Partial<SerializedGym>) {
    super();
    Object.assign(this, partial);
  }
}
