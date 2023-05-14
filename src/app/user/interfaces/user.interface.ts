import { Request } from '@nestjs/common';
// entities
import { User } from '@app/user/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
