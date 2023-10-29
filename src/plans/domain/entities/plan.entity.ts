import {
  ITimestamps,
  TTimestamps,
} from 'src/database/domain/entities/ITimestamps';

export interface IPlan extends ITimestamps {
  uuid: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  branch: string;
  status: string;
}

export type TPlan = TTimestamps & {
  uuid: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  branch: string;
  status: string;
};

export class Plan implements TPlan {
  uuid: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  branch: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export class SerializedPlan extends Plan {
  constructor(partial: Partial<SerializedPlan>) {
    super();
    Object.assign(this, partial);
  }
}
