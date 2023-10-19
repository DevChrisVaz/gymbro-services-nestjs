import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { LogInDto } from './application/dtos';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Response } from 'express';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  async logIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.loginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true, // La cookie solo es accesible desde el servidor
      secure: true, // Solo se envía sobre conexiones HTTPS
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 7 * 24 * 60 * 60, // Tiempo de expiración en segundos (por ejemplo, 30 días)
      path: '/token', // La ruta donde se enviará la cookie (ajusta según tus necesidades)
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken }
  }
}
