import { Servicio } from 'src/service/entities/Servicio.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class AtencionMedica extends Servicio {
  @Column()
  medico_asignado: string;
}
