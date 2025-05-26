import { Controller } from '@nestjs/common';
import { LineaTransaccionController } from '../linea-transaccion.controller';
import { DescargoService } from './descargo.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Linea Descargo')
@Controller()
export class DescargoController extends LineaTransaccionController {
  constructor(descargoService: DescargoService) {
    super(descargoService);
  }
}
