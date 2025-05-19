import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ProcedimientoMedico } from './entities/ProcedimientoMedico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedimientoMedicoController } from './procedimiento-medico.controller';
import { ProcedimientoMedicoService } from './procedimiento-medico.service';
import { AtencionMedicaController } from './atencion-medica.controller';
import { AtencionMedicaService } from './atencion-medica.service';
import { AtencionMedica } from './entities/AtencionMedica.entity';
import { ExamenLab } from './entities/ExamenLab.entity';
import { ExamenLabController } from './examen-lab.controller';
import { ExamenLabService } from './examen-lab.service';
import { ImagenRayosX } from './entities/ImagenRayosX.entity';
import { ImagenRayosXController } from './imagen.controller';
import { ImagenService } from './imagen.service';
import { SuministroMedicamento } from './entities/SuministroMedicamento.entity';
import { SuministroMedicamentoController } from './suministro.controller';
import { SuministroMedicamentoService } from './suministro.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProcedimientoMedico,
      AtencionMedica,
      ExamenLab,
      ImagenRayosX,
      SuministroMedicamento,
    ]),
  ],
  controllers: [
    ServiceController,
    ProcedimientoMedicoController,
    AtencionMedicaController,
    ExamenLabController,
    ImagenRayosXController,
    SuministroMedicamentoController,
  ],
  providers: [
    ServiceService,
    ProcedimientoMedicoService,
    AtencionMedicaService,
    ExamenLabService,
    ImagenService,
    SuministroMedicamentoService,
  ],
})
export class ServiceModule {}
