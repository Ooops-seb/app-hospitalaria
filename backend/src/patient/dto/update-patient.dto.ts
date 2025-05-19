import { PartialType } from '@nestjs/swagger';
import { CreatePacienteDto } from './create-patient.dto';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {}
