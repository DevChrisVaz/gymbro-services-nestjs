import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  UserModel,
  UserDocument,
} from 'src/users/frameworks/data/mogodb/models/user.model';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { UserRepositoryImpl } from 'src/users/frameworks/data/mogodb/user-repository.impl';
import {
  GymDocument,
  GymModel,
} from 'src/gyms/frameworks/data/mongodb/models/gym.model';
import { GymRepositoryImpl } from 'src/gyms/frameworks/data/mongodb/gym-repository.impl';
import { CustomerRepositoryImpl } from 'src/customers/frameworks/data/mongodb/customer-repository.impl';
import {
  CustomerDocument,
  CustomerModel,
} from 'src/customers/frameworks/data/mongodb/models/customer.model';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { TokenRepository } from 'src/auth/frameworks/data/mongodb/token.repository';
import {
  TokenDocument,
  TokenModel,
} from 'src/auth/frameworks/data/mongodb/models/token.model';
import {
  AuthDocument,
  AuthModel,
} from 'src/auth/frameworks/data/mongodb/models/auth.model';
import { AuthRepositoryImpl } from 'src/auth/frameworks/data/mongodb/auth.repository';
import { AuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import {
  SubscriptionDocument,
  SubscriptionModel,
} from 'src/subscriptions/frameworks/data/mongodb/models/subscription.model';
import {
  PlanDocument,
  PlanModel,
} from 'src/plans/frameworks/data/mongodb/models/plan.model';
import { PlanRepositoryImpl } from 'src/plans/frameworks/data/mongodb/plan.repository';
import { SubscriptionRepositoryImpl } from 'src/subscriptions/frameworks/data/mongodb/subscription.repository';
import {
  BranchDocument,
  BranchModel,
} from 'src/branches/frameworks/data/mongodb/models/branch.model';
import { BranchRepositoryImpl } from 'src/branches/frameworks/data/mongodb/branch.repository';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import {
  AddressDocument,
  AddressModel,
} from 'src/addresses/frameworks/data/mongodb/models/address.model';
import { AddressRepositoryImpl } from 'src/addresses/frameworks/data/mongodb/address.repository';
import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';
import {
  BranchPermitionDocument,
  BranchPermitionModel,
} from 'src/permitions/frameworks/data/mongodb/models/branch-permition.model';
import { BranchPermitionRepositoryImpl } from 'src/permitions/frameworks/data/mongodb/branch-permition.repository';
import { GYMUserRepositoryContract } from 'src/gyms/domain/repositories/gym-user.repository';
import {
  GYMUserDocument,
  GYMUserModel,
} from 'src/gyms/frameworks/data/mongodb/models/gym-user.model';
import { GYMUserRepositoryImpl } from 'src/gyms/frameworks/data/mongodb/gym-user.repository';
import { SessionContract } from 'src/database/domain/contracts/session.contract';
import { MongoDBSession } from './mongodb-session';
import {
  RoleDocument,
  RoleModel,
} from 'src/permitions/frameworks/data/mongodb/models/role.model';
import {
  UserRoleDocument,
  UserRoleModel,
} from 'src/permitions/frameworks/data/mongodb/models/user-role.model';
import { IRole } from 'src/permitions/domain/entities/role.entity';
import { IUserRole } from 'src/permitions/domain/entities/user-role.entity';
import { RoleRepositoryImpl } from 'src/permitions/frameworks/data/mongodb/role.repository';
import { UserRoleRepositoryImpl } from 'src/permitions/frameworks/data/mongodb/user-role.model';
import { PersonRepositoryImpl } from 'src/users/frameworks/data/mogodb/person-repository.impl';
import {
  PersonDocument,
  PersonModel,
} from 'src/users/frameworks/data/mogodb/models/person.model';
import { IEquipment } from 'src/equipment/domain/entities/equipment.entity';
import {
  EquipmentDocument,
  EquipmentModel,
} from 'src/equipment/frameworks/data/mongodb/models/equipment.model';
import { EquipmentRepositoryImpl } from 'src/equipment/frameworks/data/mongodb/equipment.repository';

@Injectable()
export class MongoDBServices
  implements DatabaseServicesContract, OnApplicationBootstrap
{
  session: SessionContract;
  persons: PersonRepositoryImpl;
  users: UserRepositoryImpl;
  gyms: GymRepositoryImpl;
  GYMUsers: GYMUserRepositoryContract;
  customers: CustomerRepositoryImpl;
  tokens: TokenRepository;
  auth: AuthRepository;
  plans: RepositoryContract<IPlan>;
  subscriptions: RepositoryContract<ISubscription>;
  branches: RepositoryContract<IBranch>;
  addresses: RepositoryContract<IAddress>;
  equipment: RepositoryContract<IEquipment>;

  roles: RepositoryContract<IRole>;
  userRoles: RepositoryContract<IUserRole>;
  branchPermitions: RepositoryContract<IBranchPermition>;

  constructor(
    @InjectModel(PersonModel.name)
    private personRepository: Model<PersonDocument>,
    @InjectModel(UserModel.name)
    private userRepository: Model<UserDocument>,
    @InjectModel(GymModel.name)
    private gymRepository: Model<GymDocument>,
    @InjectModel(GYMUserModel.name)
    private GYMUserRepository: Model<GYMUserDocument>,
    @InjectModel(CustomerModel.name)
    private customerRepository: Model<CustomerDocument>,
    @InjectModel(TokenModel.name)
    private tokenRepository: Model<TokenDocument>,
    @InjectModel(AuthModel.name)
    private authRepository: Model<AuthDocument>,
    @InjectModel(PlanModel.name)
    private planRepository: Model<PlanDocument>,
    @InjectModel(SubscriptionModel.name)
    private subscriptionRepository: Model<SubscriptionDocument>,
    @InjectModel(BranchModel.name)
    private branchRepository: Model<BranchDocument>,
    @InjectModel(AddressModel.name)
    private addressRepository: Model<AddressDocument>,
    @InjectModel(EquipmentModel.name)
    private equipmentRepository: Model<EquipmentDocument>,

    @InjectModel(RoleModel.name)
    private roleRepository: Model<RoleDocument>,
    @InjectModel(UserRoleModel.name)
    private userRoleRepository: Model<UserRoleDocument>,
    @InjectModel(BranchPermitionModel.name)
    private branchPermitionRepository: Model<BranchPermitionDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  onApplicationBootstrap() {
    this.session = new MongoDBSession();
    this.persons = new PersonRepositoryImpl(this.personRepository);
    this.users = new UserRepositoryImpl(this.userRepository);
    this.gyms = new GymRepositoryImpl(this.gymRepository);
    this.GYMUsers = new GYMUserRepositoryImpl(this.GYMUserRepository);
    this.customers = new CustomerRepositoryImpl(this.customerRepository);
    this.tokens = new TokenRepository(this.tokenRepository);
    this.auth = new AuthRepositoryImpl(this.authRepository);
    this.plans = new PlanRepositoryImpl(this.planRepository);
    this.subscriptions = new SubscriptionRepositoryImpl(
      this.subscriptionRepository,
    );
    this.branches = new BranchRepositoryImpl(this.branchRepository);
    this.addresses = new AddressRepositoryImpl(this.addressRepository);
    this.equipment = new EquipmentRepositoryImpl(this.equipmentRepository);

    this.roles = new RoleRepositoryImpl(this.roleRepository);
    this.userRoles = new UserRoleRepositoryImpl(this.userRoleRepository);
    this.branchPermitions = new BranchPermitionRepositoryImpl(
      this.branchPermitionRepository,
    );
  }

  async runInTransaction(
    operations: (session: ClientSession) => Promise<any>,
  ): Promise<any> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const result = await operations(session);
      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
