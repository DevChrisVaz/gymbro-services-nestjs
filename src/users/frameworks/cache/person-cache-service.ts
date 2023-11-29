import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PersonCacheServiceContract } from 'src/users/domain/contracts/person-cache-service-contract';
import { IPerson } from 'src/users/domain/entities/person.entity';

@Injectable()
export class PersonCacheService implements PersonCacheServiceContract {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async storePerson(person: IPerson): Promise<void> {
    const personStr: string = JSON.stringify(person);
    await this.cacheManager.set(
      person.uuid,
      personStr,
      1000 * 60 * 60 * 24 * 15,
    );
  }

  async getPerson(key: string): Promise<IPerson | null> {
    const personStr: string = await this.cacheManager.get(key);
    if (!personStr) return null;
    const person: IPerson = JSON.parse(personStr);
    return person;
  }

  async removePerson(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
