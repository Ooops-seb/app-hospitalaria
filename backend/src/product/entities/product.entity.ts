import { LineaTransaccion } from 'src/line/entities/line.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column('float')
  precio: number;

  @OneToMany(() => LineaTransaccion, (linea) => linea.producto)
  lineas: LineaTransaccion[];
}
