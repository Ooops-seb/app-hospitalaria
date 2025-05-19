import { PartialType } from '@nestjs/swagger';
import { CreateImagenRayosXDto } from './create-imagen.dto';

export class UpdateImagenRayosXDto extends PartialType(CreateImagenRayosXDto) {}
