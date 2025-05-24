import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './Servicio.entity';

@ChildEntity()
export class ProcedimientoMedico extends Servicio {
  @Column()
  medico_asignado: string;

  @Column({ type: 'text' })
  procedimiento: string;
}
