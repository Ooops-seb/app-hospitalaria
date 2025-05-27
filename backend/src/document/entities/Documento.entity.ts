import { EstadosEnum } from 'common/enums/Estado.enum';
import { Paciente } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  direccion: string;

  @Column()
  cliente: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.documentos)
  paciente: Paciente;

  @Column({
    type: 'enum',
    enum: EstadosEnum,
    default: EstadosEnum.DEFAULT,
  })
  estado: EstadosEnum;
}
