import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// services
import { UserService } from '@app/user/services';
// config
import { AuthConfig, authConfig } from '@config/auth.config';
// entities
import { User, UserWithoutPassword } from '@app/user/entities/user.entity';
// dto
import { CreateUserDto } from '@app/user/dto';
// types
import type { JwtPayload, JwtTokens } from '@app/auth/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    protected readonly _authConfig: AuthConfig,
  ) {}

  async login(user: User): Promise<JwtTokens> {
    return {
      access_token: this.generateAccessToken(user),
      refresh_token: this.generateRefreshToken(user),
    };
  }

  async signup(dto: CreateUserDto): Promise<JwtTokens> {
    const candidate = await this.userService.findOneByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      access_token: this.generateAccessToken(user),
      refresh_token: this.generateRefreshToken(user),
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<Pick<JwtTokens, 'access_token'>> {
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userService.findOneById(payload.sub);

    return { access_token: this.generateAccessToken(user) };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userService.findOneByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user?.password || '');

    if (user && passwordEquals) {
      return this.userService.excludePassword(user);
    }

    throw new UnauthorizedException('Wrong email or password');
  }

  private generateAccessToken(user: User | UserWithoutPassword): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    };

    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(user: User | UserWithoutPassword): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    };

    return this.jwtService.sign(payload, {
      expiresIn: this._authConfig.refreshTokenExpires,
    });
  }
}
