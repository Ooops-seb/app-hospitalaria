import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { Factura } from 'src/document/factura/entities/factura.entity';
import { LineaTransaccion } from 'src/line/entities/LineaTransaccion.entity';

@ChildEntity()
export class LineaFactura extends LineaTransaccion {
  @Column()
  iva: number;

  @Column({ type: 'float' })
  subtotal: number;

  @Column({ type: 'float' })
  descuento: number;

  @ManyToOne(() => Factura, (factura) => factura.lineas)
  factura: Factura;
}
