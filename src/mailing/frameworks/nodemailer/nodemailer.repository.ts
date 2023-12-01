import { Inject } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { IMail } from 'src/mailing/domain/entities/mail.entity';
import { MailerRepositoryContract } from 'src/mailing/domain/repositories/mailer.repository';

export class NodeMailerRepositoryImpl implements MailerRepositoryContract {
  constructor(
    @Inject('TRANSPORT_PROVIDER') private readonly transporter: Transporter,
  ) {}

  async sendMail(mail: IMail) {
    await this.transporter.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  }
}
