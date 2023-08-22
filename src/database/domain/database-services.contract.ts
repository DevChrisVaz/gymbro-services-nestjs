import { User } from "src/users/domain/entities/User";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { RepositoryContract } from "./repository.contract";

export abstract class DatabaseServicesContract {
    abstract users: RepositoryContract<User>;
    abstract gyms: RepositoryContract<IGym>;
    abstract customers: RepositoryContract<Customer>
}