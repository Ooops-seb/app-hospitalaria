import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comida } from './comida/entities/comida.entity';
import { HospedajeHospitalario } from './hospedaje/entities/hospedaje.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Comida)
    private readonly comidaRepo: Repository<Comida>,
    @InjectRepository(HospedajeHospitalario)
    private readonly hospedajeRepo: Repository<HospedajeHospitalario>,
  ) {}

  async getProductsList() {
    const comidas = await this.comidaRepo.find();
    const hospedajes = await this.hospedajeRepo.find();
    const all = [
      ...comidas.map((c) => ({ ...c, tipo_producto: 'comida' })),
      ...hospedajes.map((h) => ({ ...h, tipo_producto: 'hospedaje' })),
    ];
    return all;
  }
}
