import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './create-patient.dto';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {}
