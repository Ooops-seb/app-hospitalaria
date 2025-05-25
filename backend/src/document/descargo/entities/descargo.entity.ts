import { ChildEntity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { LineaDescargo } from 'src/line/entities/LineaDescargo.entity';
import { Documento } from 'src/document/entities/Documento.entity';
import { Factura } from 'src/document/factura/entities/factura.entity';

@ChildEntity()
export class Descargo extends Documento {
  @OneToMany(() => LineaDescargo, (linea) => linea.descargo)
  lineas: LineaDescargo[];

  @OneToOne(() => Factura)
  @JoinColumn()
  factura: Factura;
}
