import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) : Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
