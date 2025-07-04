import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    AuthGuard, 
    RoleGuard,
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "900s"
      },
    }),
    UsersModule,
  ],
  exports: [ AuthGuard, RoleGuard, AuthService ]
})
export class AuthModule {}
