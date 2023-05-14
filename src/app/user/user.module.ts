import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// controllers
import { UserController } from '@app/user/controllers';
// services
import { UserService } from '@app/user/services';
// entities
import { User } from '@app/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
