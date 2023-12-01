import { IPerson } from 'src/users/domain/entities/person.entity';
import { IGym } from '../entities/gym.entity';

export abstract class GYMMailerServiceContract {
  abstract sendConfirmRegistrationEmail(
    gym: IGym,
    person: IPerson,
  ): Promise<void>;
}
