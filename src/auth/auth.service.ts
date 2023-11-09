import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async generateAccessToken(payload: any, expiration: string): Promise<any> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiration,
    });
  }

  async generateRefreshToken(payload: any): Promise<any> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
  }
}
