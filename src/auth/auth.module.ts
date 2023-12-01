import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { DatabaseModule } from 'src/database/database.module';
import authConfig, { configProviders } from './auth.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { RefreshSessionUseCase } from './application/usecases/refresh-session.usecase';
import { CustomerLoginUseCase } from './application/usecases/customer-login.usecase';
import { UserLoginUseCase } from './application/usecases/user-login.usecase';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    DatabaseModule,
    EncryptionModule,
  ],
  controllers: [AuthController],
  providers: [
    ...configProviders,
    AuthService,
    CustomerLoginUseCase,
    UserLoginUseCase,
    RefreshSessionUseCase,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, CustomerLoginUseCase],
})
export class AuthModule {}
