import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { Descargo } from 'src/document/descargo/entities/descargo.entity';
import { LineaTransaccion } from 'src/line/entities/LineaTransaccion.entity';

@ChildEntity()
export class LineaDescargo extends LineaTransaccion {
  @Column()
  nota_venta: string;

  @ManyToOne(() => Descargo, (descargo) => descargo.lineas)
  descargo: Descargo;
}
