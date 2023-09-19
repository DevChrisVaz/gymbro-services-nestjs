import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LoginUseCase } from './application/usecases/login.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUseCase
  ],
  exports: [AuthService]
})
export class AuthModule {}
