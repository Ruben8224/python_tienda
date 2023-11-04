import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarritocompraService } from './carritocompra.service';
import { CreateCarritocompraDto } from './dto/create-carritocompra.dto';
import { UpdateCarritocompraDto } from './dto/update-carritocompra.dto';

@Controller('carritocompra')
export class CarritocompraController {
  constructor(private readonly carritocompraService: CarritocompraService) {}

  @Post()
  create(@Body() createCarritocompraDto: CreateCarritocompraDto) {
    return this.carritocompraService.create(createCarritocompraDto);
  }

  @Get()
  findAll() {
    return this.carritocompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritocompraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarritocompraDto: UpdateCarritocompraDto,
  ) {
    return this.carritocompraService.update(+id, updateCarritocompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritocompraService.remove(+id);
  }
}
