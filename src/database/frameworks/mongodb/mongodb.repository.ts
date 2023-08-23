import { Model } from "mongoose";
import { RepositoryContract } from "src/database/domain/contracts/repository.contract";

export abstract class MongoDBRepository<T> implements RepositoryContract<T> {
    private _repository: Model<T>;
    private _populateOnFind: string[];

    constructor(repository: Model<T>, populateOnFind: string[] = []) {
        this._repository = repository,
        this._populateOnFind = populateOnFind;
    }
    find(): Promise<T[]> {
        return this._repository.find().populate(this._populateOnFind);
    }
    findOne(uuid: string): Promise<T> {
        return this._repository.findOne({ uuid }).lean().populate(this._populateOnFind) as Promise<T>;
    }
    create(item: T): Promise<T> {
        return this._repository.create(item);
    }
    update(uuid: string, item: T): Promise<T> {
        return this._repository.findOneAndUpdate({ uuid }, item);
    }
    delete(uuid: string): Promise<T> {
        return this._repository.findOneAndDelete({ uuid });
    }
}