import { Module } from '@nestjs/common';
import { DescargoModule } from './descargo/descargo.module';
import { FacturaModule } from './factura/factura.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaDescargo } from 'src/line/descargo/entities/descargo.entity';
import { LineaFactura } from 'src/line/factura/entities/factura.entity';
import { Paciente } from 'src/patient/entities/patient.entity';
import { Descargo } from './descargo/entities/descargo.entity';
import { Documento } from './entities/Documento.entity';
import { Factura } from './factura/entities/factura.entity';

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
    RouterModule.register([
      {
        path: 'documentos',
        children: [
          {
            path: 'descargo',
            module: DescargoModule,
          },
          {
            path: 'factura',
            module: FacturaModule,
          },
        ],
      },
    ]),
    DescargoModule,
    FacturaModule,
  ],
})
export class DocumentModule {}
