import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carritocompra {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cantidad: number;
  @Column()
  subtotal: number;
  @Column()
  idusuario: number;
  @Column('integer', { array: true })
  idproducto: number[] | any;
}
