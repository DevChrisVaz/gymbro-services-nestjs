import { Provider } from "@nestjs/common";
import { FindOneUseCaseContract } from "src/core/contracts/usecase.contract";
import { FindUserUseCase } from "./FindUserUseCase";
import { IUser } from "src/users/domain/entities/User";

export const useCaseProviders: Provider[] = [
    {
        provide: FindOneUseCaseContract<IUser>,
        useClass: FindUserUseCase
    }
]