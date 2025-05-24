import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './Servicio.entity';

@ChildEntity()
export class ImagenRayosX extends Servicio {
  @Column()
  zona_cuerpo: string;
}
