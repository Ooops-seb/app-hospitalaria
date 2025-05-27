import { Module } from '@nestjs/common';
import { DescargoModule } from './descargo/descargo.module';
import { FacturaModule } from './factura/factura.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaTransaccion } from './entities/LineaTransaccion.entity';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'transacciones',
        children: [
          {
            path: 'factura',
            module: FacturaModule,
          },
          {
            path: 'descargo',
            module: DescargoModule,
          },
        ],
      },
    ]),
    DescargoModule,
    FacturaModule,
    TypeOrmModule.forFeature([LineaTransaccion]),
  ],
})
export class LineModule {}
