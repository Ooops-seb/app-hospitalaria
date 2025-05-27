import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/Servicio.entity';
import { AtencionMedica } from './atencion/entities/atencion.entity';
import { ExamenLab } from './examen/entities/ExamenLab.entity';
import { ImagenRayosX } from './imagen/entities/ImagenRayosX.entity';
import { ProcedimientoMedico } from './procedimiento/entities/ProcedimientoMedico.entity';
import { SuministroMedicamento } from './suministro/entities/SuministroMedicamento.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
    @InjectRepository(AtencionMedica)
    private readonly atencionRepo: Repository<AtencionMedica>,
    @InjectRepository(ExamenLab)
    private readonly examenRepo: Repository<ExamenLab>,
    @InjectRepository(ImagenRayosX)
    private readonly imagenRepo: Repository<ImagenRayosX>,
    @InjectRepository(ProcedimientoMedico)
    private readonly procedimientoRepo: Repository<ProcedimientoMedico>,
    @InjectRepository(SuministroMedicamento)
    private readonly suministroRepo: Repository<SuministroMedicamento>,
  ) {}

  async getServiciosList() {
    const servicios = await this.servicioRepo.find();
    const atenciones = await this.atencionRepo.find();
    const examenes = await this.examenRepo.find();
    const imagenes = await this.imagenRepo.find();
    const procedimientos = await this.procedimientoRepo.find();
    const suministros = await this.suministroRepo.find();
    const all = [
      ...servicios.map((s) => ({ ...s, tipo_servicio: 'servicio' })),
      ...atenciones.map((a) => ({ ...a, tipo_servicio: 'atencion' })),
      ...examenes.map((e) => ({ ...e, tipo_servicio: 'examen' })),
      ...imagenes.map((i) => ({ ...i, tipo_servicio: 'imagen' })),
      ...procedimientos.map((p) => ({ ...p, tipo_servicio: 'procedimiento' })),
      ...suministros.map((s) => ({ ...s, tipo_servicio: 'suministro' })),
    ];
    return all;
  }
}
