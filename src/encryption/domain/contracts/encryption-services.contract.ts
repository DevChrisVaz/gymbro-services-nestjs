export abstract class EncryptionServicesContract {
    abstract encrypt(data: string): string;
    abstract decrypt(encryptedData: string): string;
    abstract hash(data: string): string;
}