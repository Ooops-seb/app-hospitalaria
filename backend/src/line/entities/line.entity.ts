import { Factura } from 'src/document/entities/Factura.entity';
import { Producto } from 'src/product/entities/product.entity';
import { Servicio } from 'src/service/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LineaTransaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column('float')
  precio_unitario: number;

  @ManyToOne(() => Factura, (factura) => factura.lineas)
  factura: Factura;

  @ManyToOne(() => Producto, (producto) => producto.lineas)
  producto: Producto;

  @ManyToOne(() => Servicio, (servicio) => servicio.lineas)
  servicio: Servicio;
}
