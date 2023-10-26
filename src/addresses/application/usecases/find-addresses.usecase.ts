import { Injectable } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class FindAddressesUseCase {
  constructor(
    private dataServices: DatabaseServicesContract,
    private addressesService: AddressesService,
  ) {}

  async run(): Promise<IAddress[]> {
    const foundAddresses: IAddress[] = await this.dataServices.addresses.find(
      {},
    );
    return foundAddresses.map((address) =>
      this.addressesService.serializeAddress(address),
    );
  }
}
