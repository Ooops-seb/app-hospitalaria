import { PartialType } from '@nestjs/swagger';
import { CreateLineaDeTransaccionDto } from './create-linea-transaccion.dto';

export class UpdateLineaDeTransaccionDto extends PartialType(
  CreateLineaDeTransaccionDto,
) {}
