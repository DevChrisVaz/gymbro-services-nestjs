import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SaveTokenUseCase } from './application/usecases/generate-token.usecase';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private saveTokenUseCase: SaveTokenUseCase
    ) {}

    async generateAccessToken(data: any): Promise<string> {
        const token: string = await this.jwtService.signAsync(data, {
            expiresIn: data.expiresIn
        });
        await this.saveTokenUseCase.run({ ref: data.uuid, token });
        return token;
    }

    // async generateRefreshToken(data: any): Promise<string> {
    //     return await this.jwtService.signAsync
    // }

    async removeToken(data: any): Promise<string> {
        const token: string = await this.jwtService.signAsync(data);
        await this.saveTokenUseCase.run({ ref: data.uuid, token });
        return token;
    }
}
