import { Injectable } from '@nestjs/common';
import {
  Customer,
  SerializedCustomer,
} from './domain/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './application/dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomersService {
  mapDtoToCustomer(dto: CreateCustomerDto | UpdateCustomerDto): Customer {
    return plainToClass(Customer, dto);
  }

  serializeCustomer(customer: Customer): SerializedCustomer {
    return new SerializedCustomer(customer);
  }
}
