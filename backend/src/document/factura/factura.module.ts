import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Documento } from '../entities/Documento.entity';
import { LineaFactura } from 'src/line/factura/entities/factura.entity';
import { LineaDescargo } from 'src/line/descargo/entities/descargo.entity';
import { Paciente } from 'src/patient/entities/patient.entity';
import { Descargo } from '../descargo/entities/descargo.entity';

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
  ],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
