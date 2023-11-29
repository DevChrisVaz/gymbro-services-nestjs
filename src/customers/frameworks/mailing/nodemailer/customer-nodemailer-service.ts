import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { MailerRepositoryContract } from 'src/mailing/domain/repositories/mailer.repository';
import { IPerson } from 'src/users/domain/entities/person.entity';
import verificationEmail from '../templates/verification-email';
import { v4 as uuid } from 'uuid';
import { CustomerMailerServiceContract } from 'src/customers/domain/contracts/customer-mailer-service-contract';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerNodemailerService
  implements CustomerMailerServiceContract
{
  constructor(
    private readonly mailerService: MailerRepositoryContract,
    private readonly jwtService: JwtService,
  ) {}

  async sendVerificationEmail(
    customer: ICustomer,
    person: IPerson,
  ): Promise<string> {
    const code: string = uuid();

    const token = await this.jwtService.signAsync(
      { email: customer.email, code },
      {
        expiresIn: '15d',
      },
    );

    await this.mailerService.sendMail({
      from: 'GYMBRO Team <gymbro.test@outlook.com>',
      html: verificationEmail(person, token),
      subject: 'Verificación de cuenta',
      text: 'Verificación de cuenta',
      to: customer.email,
    });

    return code;
  }
}
