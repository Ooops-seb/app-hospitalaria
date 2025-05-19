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

  @ManyToOne(() => Servicio, (servicio) => servicio.lineas, {
    nullable: true,
    eager: true,
  })
  servicio: Servicio | null;

  @ManyToOne(() => Producto, (producto) => producto.lineas, {
    nullable: true,
    eager: true,
  })
  producto: Producto | null;
}
