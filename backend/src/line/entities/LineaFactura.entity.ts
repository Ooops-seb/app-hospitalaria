import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { LineaTransaccion } from './LineaTransaccion.entity';
import { Factura } from 'src/document/factura/entities/factura.entity';

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
