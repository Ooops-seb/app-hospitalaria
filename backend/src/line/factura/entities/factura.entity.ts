import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { Factura } from 'src/document/factura/entities/factura.entity';
import { LineaTransaccion } from 'src/line/entities/LineaTransaccion.entity';

@ChildEntity()
export class LineaFactura extends LineaTransaccion {
  @Column({ nullable: true, default: 1 })
  cantidad: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  iva: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  subtotal: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  descuento: number;

  @ManyToOne(() => Factura, (factura) => factura.lineas)
  factura: Factura;
}
