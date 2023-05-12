import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() data: SignInDTO): Promise<SignInResponseDTO> {
    return this.authService.signIn(data);
  }

  @Post('sign-up')
  signUp(@Body() data: CreateUserDto): Promise<User> {
    return this.authService.signUp(data);
  }
}
