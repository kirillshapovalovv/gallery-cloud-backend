import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// dto
import { CreateUserDto } from '@app/user/dto';
// entities
import { User, UserWithoutPassword } from '@app/user/entities/user.entity';
// constants
import { STORAGE_LIMIT } from '@app/user/constants/user.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.userRepository.save({
      ...createUserDto,
      storage_limit: STORAGE_LIMIT,
    });

    return this.excludePassword(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  excludePassword(user: User): UserWithoutPassword {
    return new UserWithoutPassword(user);
  }
}
