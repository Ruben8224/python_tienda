import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ValidationMessages } from 'src/helpers/validation.messages';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsString({ message: ValidationMessages.INPUT_TEXTO })
  nombre: string;

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsString({ message: ValidationMessages.INPUT_TEXTO })
  descripcion: string;

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsNumber({}, { message: ValidationMessages.INPUT_NUMERO })
  precio: number;

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsNumber({}, { message: ValidationMessages.INPUT_NUMERO })
  stock: number;

  @IsNotEmpty({ message: ValidationMessages.INPUT_VACIO })
  @IsString({ message: ValidationMessages.INPUT_TEXTO })
  categoria: string;
}
