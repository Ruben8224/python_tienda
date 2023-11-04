import { ValidationMessages } from 'src/helpers/validation.messages';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductoDto {
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
