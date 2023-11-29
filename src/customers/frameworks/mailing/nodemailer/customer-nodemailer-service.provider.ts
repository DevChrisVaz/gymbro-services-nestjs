import { Provider } from '@nestjs/common';
import { CustomerMailerServiceContract } from 'src/customers/domain/contracts/customer-mailer-service-contract';
import { CustomerNodemailerService } from './customer-nodemailer-service';

export const customerNodemailerServiceProvider: Provider = {
  provide: CustomerMailerServiceContract,
  useClass: CustomerNodemailerService,
};
