import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritocompraDto } from './create-carritocompra.dto';
import { ValidationMessages } from 'src/helpers/validation.messages';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCarritocompraDto extends PartialType(
  CreateCarritocompraDto,
) {
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
