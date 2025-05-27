import { PartialType } from '@nestjs/swagger';
import { CreateExamenLabDto } from './create-examen-lab.dto';

export class UpdateExamenLabDto extends PartialType(CreateExamenLabDto) {}
