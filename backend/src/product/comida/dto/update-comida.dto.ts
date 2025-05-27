import { PartialType } from '@nestjs/swagger';
import { CreateComidaDto } from './create-comida.dto';

export class UpdateComidaDto extends PartialType(CreateComidaDto) {}
