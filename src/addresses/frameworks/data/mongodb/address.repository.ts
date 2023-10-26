import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class AddressRepositoryImpl extends MongoDBRepository<IAddress> {}
