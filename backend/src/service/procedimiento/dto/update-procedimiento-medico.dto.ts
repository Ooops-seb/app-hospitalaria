import { PartialType } from '@nestjs/swagger';
import { CreateProcedimientoMedicoDto } from './create-procedimiento-medico.dto';

export class UpdateProcedimientoMedicoDto extends PartialType(
  CreateProcedimientoMedicoDto,
) {}
