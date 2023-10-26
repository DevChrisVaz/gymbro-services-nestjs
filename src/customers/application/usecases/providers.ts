import { Provider } from '@nestjs/common';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { FindCustomerUseCase } from './find-customer.usecase';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';

export const useCaseProviders: Provider[] = [
  {
    provide: FindOneUseCaseContract<Promise<CustomerResponseDTO>>,
    useClass: FindCustomerUseCase,
  },
];
