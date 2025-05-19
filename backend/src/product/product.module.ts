import { Module } from '@nestjs/common';
import { ComidaService } from './comida.service';
import { ComidaController } from './comida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comida } from './entities/Comida.entity';
import { HospedajeHospitalario } from './entities/HospedajeHospitalario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comida, HospedajeHospitalario])],
  controllers: [ComidaController],
  providers: [ComidaService],
})
export class ProductModule {}
