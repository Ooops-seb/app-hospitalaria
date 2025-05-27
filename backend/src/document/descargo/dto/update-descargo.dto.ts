import { PartialType } from '@nestjs/swagger';
import { CreateDescargoDto } from './create-descargo.dto';

export class UpdateDescargoDto extends PartialType(CreateDescargoDto) {}
