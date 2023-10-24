import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
// import { AddressesController } from './addresses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateAddressUseCase, DeleteAddressUseCase, FindAddressesUseCase, UpdateAddressUseCase, useCaseProviders } from './application/usecases';

@Module({
  imports: [
    DatabaseModule
  ],
  // controllers: [AddressesController],
  providers: [
    AddressesService,
    ...useCaseProviders,
    FindAddressesUseCase,
    CreateAddressUseCase,
    UpdateAddressUseCase,
    DeleteAddressUseCase
  ],
  exports: [
    AddressesService
  ]
})
export class AddressesModule {}
