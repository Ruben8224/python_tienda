import { Injectable } from '@nestjs/common';
import { CreateCarritocompraDto } from './dto/create-carritocompra.dto';
import { UpdateCarritocompraDto } from './dto/update-carritocompra.dto';

import { Carritocompra } from './entities/carritocompra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ValidationMessages } from 'src/helpers/validation.messages';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CarritocompraService {
  constructor(
    @InjectRepository(Carritocompra)
    private readonly carritocompraRepository: Repository<Carritocompra>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createCarritocompraDto: CreateCarritocompraDto) {
    if (!Array.isArray(createCarritocompraDto.idproducto)) {
      throw new Error(ValidationMessages.ELEMENTO_NO_EXISTE);
    }

    // Verificar si existen los productos
    const productos = await this.productoRepository.findByIds(
      createCarritocompraDto.idproducto,
    );

    if (productos.length !== createCarritocompraDto.idproducto.length) {
      throw new Error(ValidationMessages.ELEMENTO_NO_EXISTE);
    }

    const carritocompra = this.carritocompraRepository.create({
      idproducto: createCarritocompraDto.idproducto, // Asigna el array de IDs
      cantidad: createCarritocompraDto.cantidad,
      subtotal: createCarritocompraDto.subtotal,
      idusuario: createCarritocompraDto.idusuario,
    });

    return await this.carritocompraRepository.save(carritocompra);
  }

  findAll() {
    return this.carritocompraRepository.find();
  }

  //Obtener el carrito mediante el id del usuario, devolciendo los productos que tiene en el carrito y la información de cada producto
  async findOne(id: number) {
    const carrito: any = await this.carritocompraRepository.find({
      where: { idusuario: id },
    });

    for (const item of carrito[0].idproducto) {
      const producto = await this.productoRepository.findOneById(item);
      //Guardar el nombre, precio y descripcion del producto en una nueva variable
      const producto2 = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
      };

      carrito[0].idproducto[carrito[0].idproducto.indexOf(item)] = producto2;
    }
    return carrito;
  }

  async update(id: number, updateCarritocompraDto: UpdateCarritocompraDto) {
    const { idproducto, cantidad, subtotal } = updateCarritocompraDto;

    // Verifica si el carrito existe
    const existingCarrito: any = await this.carritocompraRepository.find({
      where: { idusuario: id },
    });

    if (!existingCarrito) {
      throw new Error('Carrito de compras no encontrado');
    }

    // Convierte existingCarrito.idproducto en un array si no lo es
    if (!Array.isArray(existingCarrito[0].idproducto)) {
      existingCarrito.idproducto = [existingCarrito.idproducto];
    }

    // Verifica si idproducto es un array y si no, conviértelo en un array
    const updatedIdproductos = Array.isArray(idproducto)
      ? idproducto
      : [idproducto];

    // Agrega los nuevos IDs al array existente
    existingCarrito[0].idproducto = [
      ...existingCarrito[0].idproducto,
      ...updatedIdproductos,
    ];

    // Actualiza la cantidad y el subtotal
    existingCarrito[0].cantidad = cantidad;
    existingCarrito[0].subtotal = subtotal;

    // Guarda los cambios en la base de datos
    const updateResult: UpdateResult = await this.carritocompraRepository.save(
      existingCarrito,
    );

    if (updateResult) {
      return existingCarrito;
    } else {
      throw new Error('Error al actualizar el carrito de compras');
    }
  }

  remove(id: number) {
    return this.carritocompraRepository.delete(id);
  }
}
