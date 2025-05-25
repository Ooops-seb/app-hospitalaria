import { Documento } from 'src/document/entities/Documento.entity';
import { LineaFactura } from 'src/line/entities/LineaFactura.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Factura extends Documento {
  @Column()
  clave_acceso: string;

  @OneToMany(() => LineaFactura, (linea) => linea.factura)
  lineas: LineaFactura[];
}
