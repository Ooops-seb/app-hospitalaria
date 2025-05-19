import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
