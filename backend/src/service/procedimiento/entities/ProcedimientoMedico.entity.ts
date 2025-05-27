import { Servicio } from 'src/service/entities/Servicio.entity';
import { Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class ProcedimientoMedico extends Servicio {
  @Column()
  medico_asignado: string;

  @Column({ type: 'text' })
  procedimiento: string;
}
