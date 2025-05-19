import { ChildEntity, Column } from 'typeorm';
import { Producto } from './product.entity';

@ChildEntity()
export class Comida extends Producto {
  @Column()
  valor_nutritivo: string;

  @Column()
  tipo: string;
}
