import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// services
import { AuthService } from '@app/auth/services';
// dto
import { CreateUserDto, CreateUserWithoutFullNameDto } from '@app/user/dto';
// guards
import { LocalAuthGuard } from '@app/auth/guards';
// schemas
import {
  accessTokenResponseSchema,
  jwtTokensResponseSchema,
} from '@app/auth/schemas';

// types
import type { RequestWithUser } from '@app/user/interfaces';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, schema: jwtTokensResponseSchema })
  @ApiBody({ type: CreateUserWithoutFullNameDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({ status: 200, schema: jwtTokensResponseSchema })
  @ApiBody({ type: CreateUserDto })
  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 200, schema: accessTokenResponseSchema })
  @Post('/refresh-token')
  async refresh(@Req() req) {
    return this.authService.refreshToken(req.cookies?.refreshToken);
  }
}
