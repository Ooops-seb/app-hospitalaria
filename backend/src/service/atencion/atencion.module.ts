import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtencionMedica } from './entities/atencion.entity';
import { Servicio } from '../entities/Servicio.entity';
import { AtencionMedicaController } from './atencion.controller';
import { AtencionMedicaService } from './atencion.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtencionMedica, Servicio])],
  controllers: [AtencionMedicaController],
  providers: [AtencionMedicaService],
})
export class AtencionModule {}
