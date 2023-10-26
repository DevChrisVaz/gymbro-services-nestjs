import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { DatabaseModule } from 'src/database/database.module';
import {
  CreateAddressUseCase,
  DeleteAddressUseCase,
  FindAddressesUseCase,
  UpdateAddressUseCase,
  useCaseProviders,
} from './application/usecases';

@Module({
  imports: [DatabaseModule],
  providers: [
    AddressesService,
    ...useCaseProviders,
    FindAddressesUseCase,
    CreateAddressUseCase,
    UpdateAddressUseCase,
    DeleteAddressUseCase,
  ],
  exports: [AddressesService],
})
export class AddressesModule {}
