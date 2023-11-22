import { Module } from '@nestjs/common';
// import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { CreateEquipmentUseCase } from './application/usecases/create-equipment.usecase';
import { UploadEquipmentImageUseCase } from './application/usecases/upload-equipment-image.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { CloudModule } from 'src/cloud/cloud.module';

@Module({
  imports: [DatabaseModule, CloudModule],
  controllers: [EquipmentController],
  providers: [
    CreateEquipmentUseCase,
    UploadEquipmentImageUseCase,
    // EquipmentService
  ]
})
export class EquipmentModule { }
