import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';
import { CarritocompraModule } from './carritocompra/carritocompra.module';
import { Carritocompra } from './carritocompra/entities/carritocompra.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: '',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: '',
      entities: [Producto, Carritocompra],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // Opcional: establece en false si no quieres verificar el certificado SSL
        },
      },
    }),
    ProductosModule,
    CarritocompraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
