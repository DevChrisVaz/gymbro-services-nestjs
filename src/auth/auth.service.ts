import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: any, expiration: string): Promise<any> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiration,
    });
  }

  async generateRefreshToken(payload: any): Promise<any> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
  }
}
