import { IMail } from "src/mailing/domain/entities/mail.entity";
import { MailerRepositoryContract } from "src/mailing/domain/repositories/mailer.repository";
import transporter from "./nodemailer.config";

export class NodeMailerRepositoryImpl extends MailerRepositoryContract {
    async sendMail(mail: IMail) {
        await transporter.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        });
    }
}