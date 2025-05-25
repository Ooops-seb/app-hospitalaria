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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Descargo,
      Factura,
      Documento,
      LineaDescargo,
      Paciente,
    ]),
    forwardRef(() => LineaDescargoModule),
  ],
  controllers: [DescargoController],
  providers: [DescargoService],
})
export class DescargoModule {}
