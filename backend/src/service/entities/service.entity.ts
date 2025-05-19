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
export class Servicio {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'date' })
  registro: Date;

  @Column()
  descripcion: string;

  @Column({ type: 'float' })
  precio: number;

  @OneToMany(() => LineaTransaccion, (linea) => linea.servicio)
  lineas: LineaTransaccion[];
}
