import { Producto } from 'src/product/entities/Producto.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Comida extends Producto {
  @Column()
  valor_nutritivo: string;

  @Column()
  tipo: string;
}
