import { Module } from '@nestjs/common';
import { s3ClientProvider } from './providers/s3-client.provider';
import { ConfigModule } from '@nestjs/config';
import s3Config from './s3.config';
import { FileStorageService } from 'src/cloud/domain/contracts/file-storage-service';
import { s3ServiceProvider } from './providers/s3-service.provider';
import { s3BucketNameProvider } from './providers/s3-bucket-name.provider';

@Module({
  imports: [ConfigModule.forFeature(s3Config)],
  providers: [s3ClientProvider, s3BucketNameProvider, s3ServiceProvider],
  exports: [FileStorageService],
})
export class S3Module {}
