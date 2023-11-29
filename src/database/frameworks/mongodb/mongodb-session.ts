import mongoose, { ClientSession } from 'mongoose';
import { SessionContract } from 'src/database/domain/contracts/session.contract';

export class MongoDBSession implements SessionContract {
  session: ClientSession;

  async startSession(): Promise<void> {
    this.session = await mongoose.startSession();
  }

  startTransaction(): void {
    this.session.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    this.session.commitTransaction();
  }

  async abortTransaction(): Promise<void> {
    this.session.abortTransaction();
  }

  endSession(): void {
    this.session.endSession();
  }
}
