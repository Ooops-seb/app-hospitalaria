import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentoTransaccional } from './document.entity';
import { LineaTransaccion } from 'src/line/entities/line.entity';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clave_acceso: string;

  @ManyToOne(() => DocumentoTransaccional, (doc) => doc.facturas)
  documento: DocumentoTransaccional;

  @OneToMany(() => LineaTransaccion, (linea) => linea.factura)
  lineas: LineaTransaccion[];
}
