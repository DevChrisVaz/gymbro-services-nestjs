import { Readable } from "stream";

export abstract class FileStorageService {
    abstract uploadFile(body: Readable, key: string): Promise<void>
}