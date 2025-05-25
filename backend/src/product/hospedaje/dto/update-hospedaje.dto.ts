import { PartialType } from '@nestjs/swagger';
import { CreateHospedajeHospitalarioDto } from './create-hospedaje.dto';

export class UpdateHospedajeHospitalarioDto extends PartialType(
  CreateHospedajeHospitalarioDto,
) {}
