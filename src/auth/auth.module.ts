import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LoginUseCase } from './application/usecases/login.usecase';
import { DatabaseModule } from 'src/database/database.module';
import authConfig, { configProviders } from './auth.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    ...configProviders,
    AuthService,
    LoginUseCase,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
