import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LineaTransaccionController } from '../linea-transaccion.controller';
import { FacturaService } from './factura.service';

@ApiTags('Linea Factura')
@Controller()
export class FacturaController extends LineaTransaccionController {
  constructor(facturaService: FacturaService) {
    super(facturaService);
  }
}
