import { Provider } from '@nestjs/common';
import { CustomerCacheServiceContract } from 'src/customers/domain/contracts/customer-cache-service-contract';
import { CustomerCacheService } from './customer-cache-service';

export const customerCacheServiceProvider: Provider = {
  provide: CustomerCacheServiceContract,
  useClass: CustomerCacheService,
};
