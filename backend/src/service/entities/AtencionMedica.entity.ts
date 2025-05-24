import { ChildEntity, Column } from 'typeorm';
import { Servicio } from './Servicio.entity';

@ChildEntity()
export class AtencionMedica extends Servicio {
  @Column()
  medico_asignado: string;
}
