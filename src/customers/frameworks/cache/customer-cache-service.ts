import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CustomerCacheServiceContract } from 'src/customers/domain/contracts/customer-cache-service-contract';
import { ICustomerWithPassword } from 'src/customers/domain/entities/customer.entity';

@Injectable()
export class CustomerCacheService implements CustomerCacheServiceContract {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async storeCustomer(customer: ICustomerWithPassword): Promise<void> {
    const stringifyCustomer = JSON.stringify(customer);
    await this.cacheManager.set(
      customer.email,
      stringifyCustomer,
      1000 * 60 * 60 * 24 * 15,
    );
    return;
  }

  async getCustomer(key: string): Promise<ICustomerWithPassword | null> {
    const stringifyCustomer: string = await this.cacheManager.get(key);
    if (!stringifyCustomer) return null;
    const customer: ICustomerWithPassword = JSON.parse(stringifyCustomer);
    return customer;
  }

  async removeCustomer(email: string): Promise<void> {
    await this.cacheManager.del(email);
    await this.cacheManager.del(email + '_VERIFICATION');
  }

  async storeVerificationCode(email: string, code: string): Promise<void> {
    await this.cacheManager.set(
      email + '_VERIFICATION',
      code,
      1000 * 60 * 60 * 24 * 15,
    );
  }

  async getVerificationCode(email: string): Promise<string> {
    return await this.cacheManager.get(email + '_VERIFICATION');
  }
}
