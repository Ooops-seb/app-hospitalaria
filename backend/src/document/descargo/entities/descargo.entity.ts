import { ChildEntity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Documento } from 'src/document/entities/Documento.entity';
import { Factura } from 'src/document/factura/entities/factura.entity';
import { LineaDescargo } from 'src/line/descargo/entities/descargo.entity';

@ChildEntity()
export class Descargo extends Documento {
  @OneToMany(() => LineaDescargo, (linea) => linea.descargo)
  lineas: LineaDescargo[];

  @OneToOne(() => Factura)
  @JoinColumn()
  factura: Factura;
}
