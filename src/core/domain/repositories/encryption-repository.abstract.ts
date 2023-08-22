export abstract class IEncryptionRepository {
    abstract encrypt(data: string): string;
    abstract decrypt(encryptedData: string): string;
}