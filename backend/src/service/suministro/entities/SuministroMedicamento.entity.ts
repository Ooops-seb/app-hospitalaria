import { Servicio } from 'src/service/entities/Servicio.entity';
import { Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class SuministroMedicamento extends Servicio {
  @Column()
  tipo_suministro: string;
}
