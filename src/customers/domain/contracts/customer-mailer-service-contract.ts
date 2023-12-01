import { IPerson } from 'src/users/domain/entities/person.entity';
import { ICustomer } from '../entities/customer.entity';

export abstract class CustomerMailerServiceContract {
  abstract sendVerificationEmail(
    customer: ICustomer,
    person: IPerson,
  ): Promise<string>;
}
