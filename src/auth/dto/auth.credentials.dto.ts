import { IsNotEmpty } from "class-validator";

export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
