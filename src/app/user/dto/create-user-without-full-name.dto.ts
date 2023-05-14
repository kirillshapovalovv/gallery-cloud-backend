import { OmitType } from '@nestjs/swagger';
// dto
import { CreateUserDto } from '@app/user/dto';

export class CreateUserWithoutFullNameDto extends OmitType(CreateUserDto, [
  'full_name',
]) {}
