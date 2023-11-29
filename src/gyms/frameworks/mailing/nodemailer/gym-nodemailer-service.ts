import { MailerRepositoryContract } from 'src/mailing/domain/repositories/mailer.repository';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { Injectable } from '@nestjs/common';
import confirmRegistration from '../templates/confirm-registration-email';
import { GYMMailerServiceContract } from 'src/gyms/domain/contracts/gym-mailer-service-contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';

@Injectable()
export class GYMNodemailerService implements GYMMailerServiceContract {
  constructor(private readonly mailerService: MailerRepositoryContract) {}

  async sendConfirmRegistrationEmail(
    gym: IGym,
    person: IPerson,
  ): Promise<void> {
    await this.mailerService.sendMail({
      from: 'GYMBRO Team <gymbro.test@outlook.com>',
      html: confirmRegistration(person),
      subject: 'Bienvenido a GYMBRO',
      text: 'Bienvenido a GYMBRO',
      to: gym.email,
    });
  }
}
