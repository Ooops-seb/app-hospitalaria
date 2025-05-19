import { Paciente } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Factura } from './Factura.entity';

@Entity()
export class DocumentoTransaccional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nro: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column('float')
  valor: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.documentos)
  paciente: Paciente;

  @OneToMany(() => Factura, (factura) => factura.documento)
  facturas: Factura[];
}
