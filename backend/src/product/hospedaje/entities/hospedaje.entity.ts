import { Producto } from 'src/product/entities/Producto.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class HospedajeHospitalario extends Producto {
  @Column({ type: 'date' })
  fecha_ingreso: Date;

  @Column({ type: 'date' })
  fecha_salida: Date;
}
