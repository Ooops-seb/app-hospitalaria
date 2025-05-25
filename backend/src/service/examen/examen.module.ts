import { Module } from '@nestjs/common';
import { ExamenLabController } from './examen-lab.controller';
import { ExamenLabService } from './examen-lab.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenLab } from './entities/ExamenLab.entity';
import { Servicio } from '../entities/Servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenLab, Servicio])],
  controllers: [ExamenLabController],
  providers: [ExamenLabService],
})
export class ExamenModule {}
