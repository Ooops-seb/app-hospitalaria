import { Servicio } from 'src/service/entities/Servicio.entity';
import { Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class ExamenLab extends Servicio {
  @Column({ type: 'text' })
  tipo_examen: string;
}
