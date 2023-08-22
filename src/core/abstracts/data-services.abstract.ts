import { User } from "src/users/domain/entities/User";
import { IGenericRepository } from "../domain/repositories/generic-repository.abstract";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { Customer } from "src/customers/domain/entities/customer.entity";

export abstract class IDataServices {
    abstract users: IGenericRepository<User>;
    abstract gyms: IGenericRepository<IGym>;
    abstract customers: IGenericRepository<Customer>
}