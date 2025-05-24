import { EstadosEnum } from 'common/enums/Estado.enum';
import { LineaTransaccion } from 'src/line/entities/LineaTransaccion.entity';
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

  @Column({
    type: 'enum',
    enum: EstadosEnum,
    default: EstadosEnum.DEFAULT,
  })
  estado: EstadosEnum;
}
