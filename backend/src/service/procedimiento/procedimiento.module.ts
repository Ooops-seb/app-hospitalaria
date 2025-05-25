import { Module } from '@nestjs/common';
import { ProcedimientoMedicoController } from './procedimiento-medico.controller';
import { ProcedimientoMedicoService } from './procedimiento-medico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedimientoMedico } from './entities/ProcedimientoMedico.entity';
import { Servicio } from '../entities/Servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedimientoMedico, Servicio])],
  controllers: [ProcedimientoMedicoController],
  providers: [ProcedimientoMedicoService],
})
export class ProcedimientoModule {}
