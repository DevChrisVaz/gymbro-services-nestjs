import { Module } from '@nestjs/common';
import { NodeMailerModule } from './frameworks/nodemailer/nodemailer.module';

@Module({
  imports: [NodeMailerModule],
  exports: [NodeMailerModule],
})
export class MailingModule {}
