import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { User } from 'src/users/domain/entities/User';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private customerService: CustomersService,
        private jwtService: JwtService
    ) {}

    async userSignIn(userName: string, password: string): Promise<any> {
        const user: User = await this.userService.findOne(userName);
        if (user.password !== password) throw new Error();

        const payload = {
            sub: user.uuid,
            userName: user.userName
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    
}
