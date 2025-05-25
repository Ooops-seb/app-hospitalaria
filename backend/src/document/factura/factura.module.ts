import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { LineaFactura } from 'src/line/entities/LineaFactura.entity';
import { Documento } from '../entities/Documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, LineaFactura, Documento])],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
