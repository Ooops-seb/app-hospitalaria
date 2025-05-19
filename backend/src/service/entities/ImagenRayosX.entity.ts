import { Column, ChildEntity } from 'typeorm';
import { Servicio } from './service.entity';

@ChildEntity()
export class ImagenRayosX extends Servicio {
  @Column()
  zona_cuerpo: string;
}
