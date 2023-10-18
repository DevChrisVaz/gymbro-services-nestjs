export abstract class RepositoryContract<T> {
  abstract find(filter: Partial<T>): Promise<T[]>;
  abstract findOne(filter: Partial<T>): Promise<T>;
  abstract save(item: T): Promise<T>;
  abstract update(uuid: string, item: T): Promise<T>;
  abstract delete(uuid: string): Promise<T>;
}
