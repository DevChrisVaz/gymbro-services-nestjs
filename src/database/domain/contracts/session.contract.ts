export interface SessionContract {
  startSession(): Promise<void>;
  startTransaction(): void;
  commitTransaction(): Promise<void>;
  abortTransaction(): Promise<void>;
  endSession(): void;
}
