import { Servicio } from 'src/service/entities/Servicio.entity';
import { Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class ImagenRayosX extends Servicio {
  @Column()
  zona_cuerpo: string;
}
