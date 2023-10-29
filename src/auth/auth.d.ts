import { Request } from 'express';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { GYMUser } from 'src/gyms/domain/entities/gym-user.entity';

export interface UserAuthenticatedRequest extends Request {
  user: GYMUser;
}

export interface CustomerAuthenticatedRequest extends Request {
  customer: Customer;
}
