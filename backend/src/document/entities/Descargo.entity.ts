import { ChildEntity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Factura } from './Factura.entity';
import { LineaDescargo } from 'src/line/entities/LineaDescargo.entity';
import { Documento } from './Documento.entity';

@ChildEntity()
export class Descargo extends Documento {
  @OneToMany(() => LineaDescargo, (linea) => linea.descargo)
  lineas: LineaDescargo[];

  @OneToOne(() => Factura)
  @JoinColumn()
  factura: Factura;
}
