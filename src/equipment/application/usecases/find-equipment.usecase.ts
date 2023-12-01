import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IEquipment } from 'src/equipment/domain/entities/equipment.entity';

@Injectable()
export class FindEquipmentUseCase {
  constructor(private readonly databaseServices: DatabaseServicesContract) {}

  async run(): Promise<IEquipment[]> {
    const equipment: IEquipment[] = await this.databaseServices.equipment.find(
      {},
    );
    return equipment;
  }
}
