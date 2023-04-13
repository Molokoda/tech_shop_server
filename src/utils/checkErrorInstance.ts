import {
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'yup';

export const checkErrorInstance = (error: any) => {
  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message);
  } else if (
    error instanceof ValidationError ||
    error instanceof BadRequestException
  ) {
    throw new BadRequestException(error.message);
  } else {
    throw new InternalServerErrorException(error.message);
  }
};
