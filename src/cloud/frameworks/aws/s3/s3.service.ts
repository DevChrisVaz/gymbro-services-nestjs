import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { FileStorageService } from 'src/cloud/domain/contracts/file-storage-service';

@Injectable()
export class S3Service implements FileStorageService {
  constructor(
    @Inject('S3_CLIENT') private client: S3Client,
    @Inject('S3_BUCKET_NAME') private bucketName: string,
  ) {}

  async uploadFile(body: Buffer, key: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
    });
    await this.client.send(command);
    return;
  }
}
