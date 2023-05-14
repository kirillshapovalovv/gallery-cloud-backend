import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @ApiProperty({
    example: '8f3860eb-d507-4851-86bb-14b6e311f7a0',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @ApiProperty({ example: 'user@test.com', description: 'Email' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: '123456789', description: 'Password' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({ example: 'Test user', description: 'User`s full name' })
  @Column({ type: 'varchar', nullable: false })
  full_name: string;

  @ApiProperty({ example: 1000, description: 'Storage limit (in bytes)' })
  @Column({ type: 'int', nullable: false })
  storage_limit: number;

  @ApiProperty({ example: '2023-12-31T12:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: number;

  @ApiProperty({ example: '2023-12-31T12:00:00.000Z' })
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: number;
}

export class UserWithoutPassword extends OmitType(User, ['password']) {
  constructor(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    super();
    Object.assign(this, userWithoutPassword);
  }
}
