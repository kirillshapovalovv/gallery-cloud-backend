import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
// exceptions
import { ValidationException } from '@lib/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const messages = errors.map((error) => ({
        [error.property]: Object.values(error.constraints),
      }));

      throw new ValidationException({
        statusCode: HttpStatus.BAD_REQUEST,
        messages,
      });
    }

    return value;
  }
}
