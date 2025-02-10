import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message: "Password too weak",
    })
  password: string;
}
