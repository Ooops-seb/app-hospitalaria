import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/product/entities/Producto.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import { LineaTransaccion } from './entities/LineaTransaccion.entity';
import { LineaTransaccionController } from './linea-transaccion.controller';
import { LineaTransaccionService } from './linea-transaccion.service';
import { Factura } from 'src/document/factura/entities/factura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineaTransaccion, Factura, Producto, Servicio]),
  ],
  controllers: [LineaTransaccionController],
  providers: [LineaTransaccionService],
})
export class LineModule {}
