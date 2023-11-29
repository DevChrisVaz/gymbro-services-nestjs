import { Global, Module } from '@nestjs/common';
import { NodeMailerModule } from './frameworks/nodemailer/nodemailer.module';

@Global()
@Module({
  imports: [NodeMailerModule],
  exports: [NodeMailerModule],
})
export class MailingModule {}
