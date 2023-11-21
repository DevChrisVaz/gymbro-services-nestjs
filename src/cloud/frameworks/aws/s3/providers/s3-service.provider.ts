import { S3Client } from "@aws-sdk/client-s3";
import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileStorageService } from "src/cloud/domain/contracts/file-storage-service";
import { S3Service } from "../s3.service";

export const s3ServiceProvider: Provider = {
    provide: FileStorageService,
    useClass: S3Service
}