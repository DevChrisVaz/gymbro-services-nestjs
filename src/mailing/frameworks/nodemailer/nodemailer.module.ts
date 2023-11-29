import { Module } from '@nestjs/common';
import { MailerRepositoryContract } from 'src/mailing/domain/repositories/mailer.repository';
import { NodeMailerRepositoryImpl } from './nodemailer.repository';
import { ConfigModule } from '@nestjs/config';
import nodemailerConfig from './nodemailer.config';
import { transportProvider } from './providers/transport-provider';

@Module({
  imports: [ConfigModule.forFeature(nodemailerConfig)],
  providers: [
    transportProvider,
    {
      provide: MailerRepositoryContract,
      useClass: NodeMailerRepositoryImpl,
    },
  ],
  exports: [MailerRepositoryContract],
})
export class NodeMailerModule {}
