import { Module } from '@nestjs/common';
import { SuministroMedicamentoController } from './suministro.controller';
import { SuministroMedicamentoService } from './suministro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuministroMedicamento } from './entities/SuministroMedicamento.entity';
import { Servicio } from '../entities/Servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuministroMedicamento, Servicio])],
  controllers: [SuministroMedicamentoController],
  providers: [SuministroMedicamentoService],
})
export class SuministroModule {}
