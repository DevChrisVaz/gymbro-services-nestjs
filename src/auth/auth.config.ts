import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default () => ({
  apiKey: process.env.APIKEY,
});

export const configProviders: Provider[] = [
  {
    provide: 'APIKEY',
    useFactory: (configService: ConfigService) =>
      configService.get<string>('apiKey'),
    inject: [ConfigService],
  },
];
