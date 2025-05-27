import { Module } from '@nestjs/common';
import { ExamenModule } from './examen/examen.module';
import { ImagenModule } from './imagen/imagen.module';
import { AtencionModule } from './atencion/atencion.module';
import { ProcedimientoModule } from './procedimiento/procedimiento.module';
import { SuministroModule } from './suministro/suministro.module';
import { RouterModule } from '@nestjs/core';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/Servicio.entity';
import { AtencionMedica } from './atencion/entities/atencion.entity';
import { ProcedimientoMedico } from './procedimiento/entities/ProcedimientoMedico.entity';
import { SuministroMedicamento } from './suministro/entities/SuministroMedicamento.entity';
import { ImagenRayosX } from './imagen/entities/ImagenRayosX.entity';
import { ExamenLab } from './examen/entities/ExamenLab.entity';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'servicios',
        children: [
          {
            path: 'examenes',
            module: ExamenModule,
          },
          {
            path: 'atencion',
            module: AtencionModule,
          },
          {
            path: 'procedimiento',
            module: ProcedimientoModule,
          },
          {
            path: 'suministro',
            module: SuministroModule,
          },
          {
            path: 'imagen',
            module: ImagenModule,
          },
        ],
      },
    ]),
    ExamenModule,
    ImagenModule,
    AtencionModule,
    ProcedimientoModule,
    SuministroModule,
    TypeOrmModule.forFeature([
      Servicio,
      AtencionMedica,
      ProcedimientoMedico,
      SuministroMedicamento,
      ImagenRayosX,
      ExamenLab,
    ]),
  ],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
