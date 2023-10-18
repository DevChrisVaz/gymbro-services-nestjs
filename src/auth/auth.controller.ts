import {
  Controller,
  // Get,
  Post,
  // Put,
  Req,
  Res,
  // UseGuards,
} from '@nestjs/common';
import { LogInDto } from './application/dtos';
// import { AuthGuard } from './auth.guard';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Request, Response } from 'express';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  async logIn(@Req() req: Request, @Res() res: Response) {
    const logInDto: LogInDto = req.body;
    const { accessToken, refreshToken } = await this.loginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true, // La cookie solo es accesible desde el servidor
      secure: true, // Solo se envía sobre conexiones HTTPS
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 30 * 24 * 60 * 60, // Tiempo de expiración en segundos (por ejemplo, 30 días)
      path: '/token', // La ruta donde se enviará la cookie (ajusta según tus necesidades)
    };

    return res
      .status(201)
      .cookie('token', refreshToken, cookieOptions)
      .json({ token: accessToken });
  }

  // @Put('refresh')
  // async refreshSession(@Req() req: Request, @Res() res: Response) {}

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Req() req) {
  //   return req.user;
  // }
}
