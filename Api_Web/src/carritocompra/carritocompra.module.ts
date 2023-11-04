import { Module } from '@nestjs/common';
import { CarritocompraService } from './carritocompra.service';
import { CarritocompraController } from './carritocompra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carritocompra } from './entities/carritocompra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  controllers: [CarritocompraController],
  providers: [CarritocompraService],
  imports: [
    TypeOrmModule.forFeature([Carritocompra, Producto]),
    ProductosModule,
    CarritocompraModule,
  ],
  exports: [CarritocompraService],
})
export class CarritocompraModule {}
