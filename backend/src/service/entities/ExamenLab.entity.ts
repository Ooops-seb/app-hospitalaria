import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './service.entity';

@ChildEntity()
export class ExamenLab extends Servicio {
  @Column({ type: 'text' })
  tipo_examen: string;
}
