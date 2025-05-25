import { Module } from '@nestjs/common';
import { ExamenModule } from './examen/examen.module';
import { ImagenModule } from './imagen/imagen.module';
import { AtencionModule } from './atencion/atencion.module';
import { ProcedimientoModule } from './procedimiento/procedimiento.module';
import { SuministroModule } from './suministro/suministro.module';
import { RouterModule } from '@nestjs/core';

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
  ],
})
export class ServiceModule {}
