import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IEquipment } from '../entities/equipment.entity';

export abstract class EquipmentRepositoryContract extends RepositoryContract<IEquipment> {}
