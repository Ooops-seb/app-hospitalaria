import { ChildEntity, Column } from 'typeorm';
import { Producto } from './product.entity';

@ChildEntity()
export class HospedajeHospitalario extends Producto {
  @Column({ type: 'date' })
  fecha_ingreso: Date;

  @Column({ type: 'date' })
  fecha_salida: Date;
}
