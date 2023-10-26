import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IAddress } from '../entities/address.entity';

export abstract class AddressRepositoryContract extends RepositoryContract<IAddress> {}
