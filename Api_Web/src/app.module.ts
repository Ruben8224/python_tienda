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
      type: 'postgres',
      host: 'ep-empty-wildflower-11657261.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'IrvingCM123',
      password: 'mh4qVtC3HUGl',
      database: 'Web',
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
