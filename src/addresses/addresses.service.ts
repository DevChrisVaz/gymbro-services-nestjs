import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './application/dto/create-address.dto';
import { UpdateAddressDto } from './application/dto/update-address.dto';
import {
  Address,
  IAddress,
  SerializedAddress,
} from './domain/entities/address.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddressesService {
  mapDtoToAddress(dto: CreateAddressDto | UpdateAddressDto): IAddress {
    return plainToInstance(Address, dto);
  }

  serializeAddress(branch: IAddress): SerializedAddress {
    return new SerializedAddress(branch);
  }
}
