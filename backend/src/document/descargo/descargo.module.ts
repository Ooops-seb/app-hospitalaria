import { Module } from '@nestjs/common';
import { DescargoService } from './descargo.service';
import { DescargoController } from './descargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descargo } from './entities/descargo.entity';
import { Factura } from '../factura/entities/factura.entity';
import { Documento } from '../entities/Documento.entity';
import { LineaDescargo } from 'src/line/entities/LineaDescargo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Descargo, Factura, Documento, LineaDescargo]),
  ],
  controllers: [DescargoController],
  providers: [DescargoService],
})
export class DescargoModule {}
