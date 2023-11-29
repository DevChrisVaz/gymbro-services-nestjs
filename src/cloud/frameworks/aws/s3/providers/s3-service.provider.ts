import { Provider } from '@nestjs/common';
import { FileStorageService } from 'src/cloud/domain/contracts/file-storage-service';
import { S3Service } from '../s3.service';

export const s3ServiceProvider: Provider = {
  provide: FileStorageService,
  useClass: S3Service,
};
