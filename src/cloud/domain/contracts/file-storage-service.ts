export abstract class FileStorageService {
  abstract uploadFile(body: Buffer, key: string): Promise<void>;
}
