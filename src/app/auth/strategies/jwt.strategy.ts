import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// services
import { UserService } from '@app/user/services';
// config
import { AuthConfig, authConfig } from '@config/auth.config';
// entities
import { User } from '@app/user/entities/user.entity';
// types
import type { JwtPayload } from '@app/auth/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    @Inject(authConfig.KEY)
    protected readonly _authConfig: AuthConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _authConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOneById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
