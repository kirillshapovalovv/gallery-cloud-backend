import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail({}, { message: 'Email is not valid' })
  readonly email: string;

  @ApiProperty({ default: 'Test user' })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  readonly full_name: string;

  @IsString({ message: 'Password name must be a string' })
  @Length(9, 30, {
    message: 'Password must be between 9 and 30 characters',
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must have at least 1 uppercase letter and 1 number',
  })
  @ApiProperty({ default: '123456789' })
  readonly password: string;
}
