import { ChildEntity, Column } from 'typeorm';
import { Servicio } from './service.entity';

@ChildEntity()
export class AtencionMedica extends Servicio {
  @Column()
  medico_asignado: string;
}
