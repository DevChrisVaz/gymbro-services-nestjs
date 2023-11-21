import { Injectable } from "@nestjs/common";
import { FileStorageService } from "src/cloud/domain/contracts/file-storage-service";
import { Readable } from "stream";

@Injectable()
export class UploadEquipmentImageUseCase {
    constructor(private readonly fileStorageService: FileStorageService) { }

    async run(readable: Readable, fileName: string): Promise<string> {
        const key = "equipment/" + fileName
        await this.fileStorageService.uploadFile(readable, key);
        return key;
    }
}