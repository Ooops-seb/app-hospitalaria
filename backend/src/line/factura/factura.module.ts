import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaFactura } from './entities/factura.entity';
import { LineaTransaccion } from '../entities/LineaTransaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LineaFactura, LineaTransaccion])],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
