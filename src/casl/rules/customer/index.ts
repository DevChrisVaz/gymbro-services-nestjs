import { RequiredRule } from 'src/casl/casl-ability/casl-ability.decorator';
import { Action } from 'src/casl/domain/action';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class ReadCustomerAbility implements RequiredRule {
  action = Action.Read;
  subject = Customer;
}
