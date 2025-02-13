import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
              private jstService: JwtService // Automatically available for Jwt Module

  ) {
    console.log('UserRepository instance:', this.userRepository);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise< { accessToken: string }> {
    try {

      const userName = await this.userRepository.validateUserPassword(authCredentialsDto);
      if (!userName) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      // Create and sign JWT token for authenticated user
      const payload: JwtPayload = { username: userName };
      const accessToken = this.jstService.sign(payload);

      return { accessToken };
    } catch (error) {
      console.log(error);
    }
  }
}
