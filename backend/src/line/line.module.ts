import { Module } from '@nestjs/common';
import { DescargoModule } from './descargo/descargo.module';
import { FacturaModule } from './factura/factura.module';

@Module({
  imports: [DescargoModule, FacturaModule],
})
export class LineModule {}
