import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class UpdateAddressUseCase {
  constructor(
    private readonly addressesService: AddressesService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string, dto: UpdateAddressDto): Promise<IAddress> {
    const dataToUpdate = this.addressesService.mapDtoToAddress(dto);
    const updatedAddress: IAddress = await this.dataServices.addresses.update(
      uuid,
      dataToUpdate,
    );
    return this.addressesService.serializeAddress(updatedAddress);
  }
}
