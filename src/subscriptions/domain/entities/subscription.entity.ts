import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface ISubscription extends ITimestamps {
  uuid: string;
  customer: string;
  plan: string;
  status: string;
}

// export type TSubscription = TTimestamps & {
//     uuid: string;
//     customer: string;
//     plan: string;
//     status: string;
// }

export class Subscription implements ISubscription {
  uuid: string;
  customer: string;
  plan: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export class SerializedSubscription implements ISubscription {
  uuid: string;
  customer: string;
  plan: string;
  status: string;

  constructor(partial: Partial<SerializedSubscription>) {
    Object.assign(this, partial);
  }
}
