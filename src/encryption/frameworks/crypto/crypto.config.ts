import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default () => ({
  algorithm: 'aes-256-cbc',
  key: '58ee3db86bdc34ecd2517a7c0d4099b0',
  iv: 'dc45c7104cb087856a50720e2dd6d881',
});

export const configProviders: Provider[] = [
  {
    provide: 'ALGORITHM',
    useFactory: (configService: ConfigService) =>
      configService.get<string>('algorithm'),
    inject: [ConfigService],
  },
  {
    provide: 'KEY',
    useFactory: (configService: ConfigService) =>
      Buffer.from(configService.get<string>('key')),
    inject: [ConfigService],
  },
  {
    provide: 'IV',
    useFactory: (configService: ConfigService) =>
      Buffer.from(configService.get<string>('iv')),
    inject: [ConfigService],
  },
];
