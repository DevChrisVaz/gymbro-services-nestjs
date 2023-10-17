export abstract class DataEncryptionContract {
  abstract encrypt(data: string): string;
  abstract decrypt(encryptedData: string): string;
}
