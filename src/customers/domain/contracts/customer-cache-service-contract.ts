import { ICustomerWithPassword } from '../entities/customer.entity';

export abstract class CustomerCacheServiceContract {
  abstract storeCustomer(customer: ICustomerWithPassword): Promise<void>;
  abstract getCustomer(key: string): Promise<ICustomerWithPassword | null>;
  abstract storeVerificationCode(email: string, code: string): Promise<void>;
  abstract getVerificationCode(email: string): Promise<string>;
  abstract removeCustomer(key: string): Promise<void>;
}
