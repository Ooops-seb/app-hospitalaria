import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './service.entity';

@ChildEntity()
export class SuministroMedicamento extends Servicio {
  @Column()
  tipo_suministro: string;
}
