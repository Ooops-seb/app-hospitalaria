import { PartialType } from '@nestjs/swagger';
import { CreateLineaDescargoDto } from './create-lineadescargo.dto';

export class UpdateLineaDescargoDto extends PartialType(
  CreateLineaDescargoDto,
) {}
