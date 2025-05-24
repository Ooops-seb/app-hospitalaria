import { LineaFactura } from 'src/line/entities/LineaFactura.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Documento } from './Documento.entity';

@ChildEntity()
export class Factura extends Documento {
  @Column()
  clave_acceso: string;

  @OneToMany(() => LineaFactura, (linea) => linea.factura)
  lineas: LineaFactura[];
}
