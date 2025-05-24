import { Producto } from 'src/product/entities/product.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class LineaTransaccion {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @ManyToOne(() => Servicio, (servicio) => servicio.lineas, {
    nullable: true,
    eager: true,
  })
  servicio: Servicio;

  @ManyToOne(() => Producto, (producto) => producto.lineas, {
    nullable: true,
    eager: true,
  })
  producto: Producto;

  @Column({ type: 'float' })
  total: number;
}
