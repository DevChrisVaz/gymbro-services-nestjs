import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const s3BucketNameProvider: Provider = {
  provide: 'S3_BUCKET_NAME',
  useFactory: (configService: ConfigService) =>
    configService.get<string>('s3BucketName'),
  inject: [ConfigService],
};
