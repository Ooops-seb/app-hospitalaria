import { Module, forwardRef } from '@nestjs/common';
import { DescargoService } from './descargo.service';
import { DescargoController } from './descargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descargo } from './entities/descargo.entity';
import { Factura } from '../factura/entities/factura.entity';
import { Documento } from '../entities/Documento.entity';
import { LineaDescargo } from 'src/line/descargo/entities/descargo.entity';
import { Paciente } from 'src/patient/entities/patient.entity';
import { DescargoModule as LineaDescargoModule } from 'src/line/descargo/descargo.module';
import { FacturaService } from 'src/line/factura/factura.service';
import { FacturaModule as LineaFacturaModule } from 'src/line/factura/factura.module';
import { LineaFactura } from 'src/line/factura/entities/factura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Descargo,
      Factura,
      Documento,
      LineaDescargo,
      Paciente,
      LineaFactura,
    ]),
    forwardRef(() => LineaDescargoModule),
    forwardRef(() => LineaFacturaModule),
  ],
  controllers: [DescargoController],
  providers: [DescargoService, FacturaService],
})
export class DescargoModule {}
