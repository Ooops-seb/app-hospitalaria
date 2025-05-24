import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './Servicio.entity';

@ChildEntity()
export class ExamenLab extends Servicio {
  @Column({ type: 'text' })
  tipo_examen: string;
}
