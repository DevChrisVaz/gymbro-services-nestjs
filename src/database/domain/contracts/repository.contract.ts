export abstract class RepositoryContract<T> {
    abstract find(): Promise<T[]>;
    abstract findOne(uuid: string): Promise<T>;
    abstract create(item: T): Promise<T>;
    abstract update(uuid: string, item: T): Promise<T>;
    abstract delete(uuid: string): Promise<T>;
}