import { PartialType } from '@nestjs/mapped-types';
import { ValidationMessages } from 'src/helpers/validation.messages';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateCarritocompraDto {
  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsArray()
  idproducto: number[];

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsNumber({}, { message: ValidationMessages.INPUT_NUMERO })
  cantidad: number;

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsNumber({}, { message: ValidationMessages.INPUT_NUMERO })
  subtotal: number;

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsNumber({}, { message: ValidationMessages.INPUT_NUMERO })
  idusuario: number;
}
