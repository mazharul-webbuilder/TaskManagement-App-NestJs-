import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";

@Injectable()
export class UserRepository extends Repository<User>{
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user: User =  this.create({ username, password });

    await this.save(user);
  }
}