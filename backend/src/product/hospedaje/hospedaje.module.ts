import { Module } from '@nestjs/common';
import { HospedajeHospitalarioController } from './hospedaje.controller';
import { HospedajeHospitalarioService } from './hospedaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospedajeHospitalario } from './entities/hospedaje.entity';
import { Producto } from '../entities/Producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HospedajeHospitalario, Producto])],
  controllers: [HospedajeHospitalarioController],
  providers: [HospedajeHospitalarioService],
})
export class HospedajeModule {}
