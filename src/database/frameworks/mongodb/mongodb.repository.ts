import { FilterQuery, Model } from 'mongoose';
import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';

export abstract class MongoDBRepository<T> implements RepositoryContract<T> {
  readonly _repository: Model<T>;
  private readonly _populateOnFind?: any;

  constructor(repository: Model<T>, populateOnFind?: any) {
    (this._repository = repository), (this._populateOnFind = populateOnFind);
  }

  find(filter: FilterQuery<T>): Promise<T[]> {
    return this._repository.find(filter).populate(this._populateOnFind).lean();
  }

  findOne(filter: FilterQuery<T>): Promise<T> {
    return this._repository
      .findOne(filter)
      .lean()
      .populate(this._populateOnFind)
      .lean() as Promise<T>;
  }

  async save(item: T): Promise<T> {
    return (await this._repository.create(item)).toObject();
  }

  update(uuid: string, item: T): Promise<T> {
    return this._repository
      .findOneAndUpdate({ uuid }, item, { new: true })
      .lean();
  }

  delete(uuid: string): Promise<T> {
    return this._repository.findOneAndDelete({ uuid }).lean();
  }
}
