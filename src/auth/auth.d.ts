import { Request } from 'express';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export interface AuthenticatedUser {
  id: string;
  name: string;
  profilePicture: string;
  role: string;
  gym?: string;
}

export interface UserAuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export interface CustomerAuthenticatedRequest extends Request {
  customer: Customer;
}
