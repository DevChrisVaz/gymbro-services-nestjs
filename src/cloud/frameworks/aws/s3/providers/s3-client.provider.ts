import { S3Client } from '@aws-sdk/client-s3';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const s3ClientProvider: Provider = {
  provide: 'S3_CLIENT',
  useFactory: async (configService: ConfigService) => {
    return new S3Client({
      region: configService.get<string>('s3BucketRegion'),
      credentials: {
        accessKeyId: configService.get<string>('s3PublicKey'),
        secretAccessKey: configService.get<string>('s3PrivateKey'),
      },
    });
  },
  inject: [ConfigService],
};
