import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './Servicio.entity';

@ChildEntity()
export class SuministroMedicamento extends Servicio {
  @Column()
  tipo_suministro: string;
}
