import { Module } from '@nestjs/common';
import { DescargoModule } from './descargo/descargo.module';
import { FacturaModule } from './factura/factura.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
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
