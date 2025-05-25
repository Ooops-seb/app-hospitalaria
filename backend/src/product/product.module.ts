import { Module } from '@nestjs/common';
import { ComidaModule } from './comida/comida.module';
import { HospedajeModule } from './hospedaje/hospedaje.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'productos',
        children: [
          {
            path: 'comida',
            module: ComidaModule,
          },
          {
            path: 'hospedaje',
            module: HospedajeModule,
          },
        ],
      },
    ]),
    ComidaModule,
    HospedajeModule,
  ],
})
export class ProductModule {}
