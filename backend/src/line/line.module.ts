import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from 'src/document/entities/Factura.entity';
import { Producto } from 'src/product/entities/product.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import { LineaTransaccion } from './entities/LineaTransaccion.entity';
import { LineaTransaccionController } from './linea-transaccion.controller';
import { LineaTransaccionService } from './linea-transaccion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineaTransaccion, Factura, Producto, Servicio]),
  ],
  controllers: [LineaTransaccionController],
  providers: [LineaTransaccionService],
})
export class LineModule {}
