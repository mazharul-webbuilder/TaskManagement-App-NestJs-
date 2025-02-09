import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [UserRepository]
})
export class AuthModule {}
