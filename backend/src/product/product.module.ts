import { Module } from '@nestjs/common';
import { ComidaModule } from './comida/comida.module';
import { HospedajeModule } from './hospedaje/hospedaje.module';
import { RouterModule } from '@nestjs/core';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comida } from './comida/entities/comida.entity';
import { HospedajeHospitalario } from './hospedaje/entities/hospedaje.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comida, HospedajeHospitalario]),
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
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
