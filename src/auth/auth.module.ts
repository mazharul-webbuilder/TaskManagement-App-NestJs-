import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '3600' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [UserRepository],
})
export class AuthModule {}
