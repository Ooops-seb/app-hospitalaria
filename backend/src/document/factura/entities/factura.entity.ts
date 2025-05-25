import { Documento } from 'src/document/entities/Documento.entity';
import { LineaFactura } from 'src/line/factura/entities/factura.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Factura extends Documento {
  @Column()
  clave_acceso: string;

  @Column({ type: 'float' })
  total: number;

  @OneToMany(() => LineaFactura, (linea) => linea.factura)
  lineas: LineaFactura[];
}
