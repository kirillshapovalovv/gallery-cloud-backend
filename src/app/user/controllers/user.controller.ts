import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// services
import { UserService } from '@app/user/services';
// entities
import { User, UserWithoutPassword } from '@app/user/entities/user.entity';
// guards
import { JwtAuthGuard } from '@app/auth/guards';
// types
import type { RequestWithUser } from '@app/user/interfaces/user.interface';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Request() req: RequestWithUser): Promise<UserWithoutPassword> {
    const user = await this.userService.findOneById(req.user.id);
    return this.userService.excludePassword(user);
  }
}
