import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '../config/auth';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [
    SharedModule,
    UsersModule,
    JwtModule.register({
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
