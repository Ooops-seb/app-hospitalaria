import { Module, forwardRef } from '@nestjs/common';
import { DescargoService } from './descargo.service';
import { DescargoController } from './descargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaDescargo } from './entities/descargo.entity';
import { LineaTransaccion } from '../entities/LineaTransaccion.entity';
import { Producto } from 'src/product/entities/Producto.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import { DescargoModule as DocumentoDescargoModule } from 'src/document/descargo/descargo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LineaDescargo,
      LineaTransaccion,
      Producto,
      Servicio,
    ]),
    forwardRef(() => DocumentoDescargoModule),
  ],
  controllers: [DescargoController],
  providers: [DescargoService],
  exports: [DescargoService],
})
export class DescargoModule {}
