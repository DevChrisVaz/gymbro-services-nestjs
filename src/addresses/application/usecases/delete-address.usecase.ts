import { Injectable } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class DeleteAddressUseCase {
  constructor(
    private dataServices: DatabaseServicesContract,
    private readonly addressesService: AddressesService,
  ) {}

  async run(id: string): Promise<IAddress> {
    const deletedAddress = await this.dataServices.addresses.delete(id);
    return this.addressesService.serializeAddress(deletedAddress);
  }
}
