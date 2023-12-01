import mongoose, { ClientSession } from 'mongoose';

export async function withTransaction(
  operations: (session: ClientSession) => Promise<void>,
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await operations(session);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // Relanza el error para que lo maneje el código que utiliza el módulo
  }
}
