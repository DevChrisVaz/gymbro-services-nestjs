import { Provider } from '@nestjs/common';
import { GYMNodemailerService } from './gym-nodemailer-service';
import { GYMMailerServiceContract } from 'src/gyms/domain/contracts/gym-mailer-service-contract';

export const GYMNodemailerServiceProvider: Provider = {
  provide: GYMMailerServiceContract,
  useClass: GYMNodemailerService,
};
