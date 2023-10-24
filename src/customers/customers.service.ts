import { Injectable } from '@nestjs/common';
import {
  Customer,
  SerializedCustomer,
} from './domain/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './application/dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomersService {
  mapDtoToCustomer(dto: CreateCustomerDto | UpdateCustomerDto): Customer {
    return plainToInstance(Customer, dto);
  }

  serializeCustomer(customer: Customer): SerializedCustomer {
    return new SerializedCustomer(customer);
  }
}
