import { ITimestamps } from 'src/database/domain/entities/ITimestamps';

export interface TokenContract extends ITimestamps {
  ref: string;
  token: string;
}

export class Token implements TokenContract {
  createdAt: string;
  updatedAt: string;
  ref: string;
  token: string;
}
