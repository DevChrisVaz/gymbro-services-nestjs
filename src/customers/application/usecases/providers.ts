import { Provider } from "@nestjs/common";
import { FindOneUseCaseContract } from "src/core/contracts/usecase.contract";
import { ICustomer } from "src/customers/domain/entities/customer.entity";
import { FindCustomerUseCase } from "./find-customer.usecase";

export const useCaseProviders: Provider[] = [
    {
        provide: FindOneUseCaseContract<ICustomer>,
        useClass: FindCustomerUseCase
    }
]