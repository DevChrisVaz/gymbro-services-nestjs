import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public createToken(data: Record<string, unknown>): string {
    const token = this.jwtService.sign(data, {
      expiresIn: 30 * 24 * 60 * 60,
    });
    return token;
  }

  public decodeToken(token: string): string | Record<string, unknown> {
    const tokenData = this.jwtService.decode(token);
    return tokenData;
  }
}
