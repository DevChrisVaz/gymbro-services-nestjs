import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
// import { GymsService } from 'src/gyms/gyms.service';
// import { MailerRepositoryContract } from 'src/mailing/domain/repositories/mailer.repository';

@Injectable()
export class ActivateGymUseCase {
  constructor(
    private dataServices: DatabaseServicesContract, // private readonly mailer: MailerRepositoryContract,
  ) {}

  async run(uuid: string): Promise<void> {
    const foundGym: IGym = await this.dataServices.gyms.findOne({ uuid });
    await this.dataServices.gyms.update(foundGym.uuid, {
      ...foundGym,
      status: 'ACTIVE',
    });
    // this.mailer.sendMail({
    //     from: '"GYMBRO Team" <team@gymbro.com>',
    //     to: ""
    // });
    return;
  }
}
