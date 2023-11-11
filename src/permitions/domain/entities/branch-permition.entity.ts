import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface IBranchPermition extends ITimestamps {
  branch: string;
  user: string;
}

export class BranchPermition implements IBranchPermition {
  branch: string;
  user: string;
  createdAt?: string;
  updatedAt?: string;
}

export class SerializedPermition extends BranchPermition {
  constructor(partial: Partial<SerializedPermition>) {
    super();
    Object.assign(this, partial);
  }
}
