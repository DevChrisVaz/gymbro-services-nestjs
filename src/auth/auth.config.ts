import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default () => ({
  apiKey: process.env.APIKEY,
  secret: process.env.SECRET,
});

export const configProviders: Provider[] = [
  {
    provide: 'APIKEY',
    useFactory: (configService: ConfigService) =>
      configService.get<string>('apiKey'),
    inject: [ConfigService],
  },
  {
    provide: 'SECRET',
    useFactory: (configService: ConfigService) =>
      configService.get<string>('secret'),
    inject: [ConfigService],
  },
];
