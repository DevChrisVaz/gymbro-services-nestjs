import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { AddressNotFoundException } from '../exceptions/address-not-found.exception';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class FindAddressUseCase {
  constructor(
    private readonly addressesService: AddressesService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<IAddress> {
    const foundAddress: IAddress = await this.dataServices.addresses.findOne({
      uuid,
    });
    if (foundAddress) {
      return this.addressesService.serializeAddress(foundAddress);
    }

    throw new AddressNotFoundException();
  }
}
