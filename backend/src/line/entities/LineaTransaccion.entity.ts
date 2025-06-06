import { EstadosEnum } from 'common/enums/Estado.enum';
import { Producto } from 'src/product/entities/Producto.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  Column,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class LineaTransaccion {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @ManyToOne(() => Servicio, (servicio) => servicio.lineas, {
    nullable: true,
  })
  servicio?: Servicio;

  @ManyToOne(() => Producto, (producto) => producto.lineas, {
    nullable: true,
  })
  producto?: Producto;

  @Column({
    type: 'enum',
    enum: EstadosEnum,
    default: EstadosEnum.DEFAULT,
  })
  estado: EstadosEnum;
}
