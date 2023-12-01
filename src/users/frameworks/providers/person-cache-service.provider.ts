import { Provider } from '@nestjs/common';
import { PersonCacheServiceContract } from 'src/users/domain/contracts/person-cache-service-contract';
import { PersonCacheService } from '../cache/person-cache-service';

export const PersonCacheServiceProvider: Provider = {
  provide: PersonCacheServiceContract,
  useClass: PersonCacheService,
};
