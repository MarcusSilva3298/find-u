import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { BcryptService } from '../shared/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtPayload } from './dto/payload.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<SignInResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const passwordsMatch = await this.bcryptService.compareHash(
      password,
      user.password,
    );

    if (!passwordsMatch) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { id: user.id };
    const accessToken: string = this.jwtService.sign(payload);

    const response: SignInResponseDTO = { access_token: accessToken };

    return response;
  }

  async signUp({ email, password, name }: CreateUserDto): Promise<User> {
    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) throw new BadRequestException('Email already in use');

    const hashedPassword = await this.bcryptService.hashPassword(password);

    return this.usersRepository.create(
      new User({ email, name, password: hashedPassword }),
    );
  }
}
