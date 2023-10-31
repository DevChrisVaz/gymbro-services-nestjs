import { Request } from 'express';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';

export interface AuthenticatedUser {
  id: string;
  name: string;
  profilePicture: string;
  gym?: string;
  permitions?: IBranchPermition[];
}

export interface UserAuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export interface CustomerAuthenticatedRequest extends Request {
  customer: Customer;
}
