import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';
import { IEquipment } from 'src/equipment/domain/entities/equipment.entity';

@Injectable()
export class CreateEquipmentUseCase {
  constructor(private readonly databaseServices: DatabaseServicesContract) {}

  async run(createEquipmentDto: CreateEquipmentDto): Promise<IEquipment> {
    return await this.databaseServices.equipment.save(createEquipmentDto);
  }
}
