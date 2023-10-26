import { IMail } from '../entities/mail.entity';

export abstract class MailerRepositoryContract {
  abstract sendMail(mail: IMail): any;
}
