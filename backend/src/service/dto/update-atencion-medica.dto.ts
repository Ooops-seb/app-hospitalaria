import { PartialType } from '@nestjs/swagger';
import { CreateAtencionMedicaDto } from './create-atencion-medica.dto';

export class UpdateAtencionMedicaDto extends PartialType(
  CreateAtencionMedicaDto,
) {}
