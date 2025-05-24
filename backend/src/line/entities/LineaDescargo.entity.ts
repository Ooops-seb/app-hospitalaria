import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { LineaTransaccion } from './LineaTransaccion.entity';
import { Descargo } from 'src/document/entities/Descargo.entity';

@ChildEntity()
export class LineaDescargo extends LineaTransaccion {
  @Column()
  nota_venta: string;

  @ManyToOne(() => Descargo, (descargo) => descargo.lineas)
  descargo: LineaDescargo;
}
