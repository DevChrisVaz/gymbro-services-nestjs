import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateAddressDto } from '../dto/create-address.dto';
import { AddressesService } from 'src/addresses/addresses.service';
import { IAddress } from 'src/addresses/domain/entities/address.entity';

@Injectable()
export class CreateAddressUseCase {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly dataServices: DatabaseServicesContract,
  ) {}

  async run(createAddressDto: CreateAddressDto): Promise<IAddress> {
    const address: IAddress =
      this.addressesService.mapDtoToAddress(createAddressDto);
    const createdAddress: IAddress = await this.dataServices.addresses.save(
      address,
    );
    return this.addressesService.serializeAddress(createdAddress);
  }
}
