import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IEquipment } from 'src/equipment/domain/entities/equipment.entity';

export class EquipmentRepositoryImpl extends MongoDBRepository<IEquipment> {}
