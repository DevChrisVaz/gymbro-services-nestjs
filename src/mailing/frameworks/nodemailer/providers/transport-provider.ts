import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

export const transportProvider: Provider = {
  provide: 'TRANSPORT_PROVIDER',
  useFactory: async (configService: ConfigService) => {
    return createTransport({
      host: configService.get<string>('nodemailerHost'),
      port: configService.get<number>('nodemailerPort'),
      secure:
        configService.get<number>('nodemailerPort') === 465 ? true : false,
      // service: configService.get<string>("nodemailerEmailService"),
      auth: {
        user: configService.get<string>('nodemailerUser'),
        pass: configService.get<string>('nodemailerPass'),
      },
    });
  },
  inject: [ConfigService],
};
