import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospedajeHospitalario } from './entities/HospedajeHospitalario.entity';
import { UpdateHospedajeHospitalarioDto } from './dto/update-hospedaje.dto';
import { Repository } from 'typeorm';
import { CreateHospedajeHospitalarioDto } from './dto/create-hospedaje.dto';

@Injectable()
export class HospedajeHospitalarioService {
  constructor(
    @InjectRepository(HospedajeHospitalario)
    private readonly hospedajeRepo: Repository<HospedajeHospitalario>,
  ) {}

  create(dto: CreateHospedajeHospitalarioDto): Promise<HospedajeHospitalario> {
    const hospedaje = this.hospedajeRepo.create(dto);
    return this.hospedajeRepo.save(hospedaje);
  }

  findAll(): Promise<HospedajeHospitalario[]> {
    return this.hospedajeRepo.find();
  }

  async findOne(id: number): Promise<HospedajeHospitalario> {
    const hospedaje = await this.hospedajeRepo.findOne({ where: { id } });
    if (!hospedaje) throw new NotFoundException('Hospedaje no encontrado');
    return hospedaje;
  }

  async update(
    id: number,
    dto: UpdateHospedajeHospitalarioDto,
  ): Promise<HospedajeHospitalario> {
    const hospedaje = await this.findOne(id);
    Object.assign(hospedaje, dto);
    return this.hospedajeRepo.save(hospedaje);
  }

  async remove(id: number): Promise<void> {
    const hospedaje = await this.findOne(id);
    await this.hospedajeRepo.remove(hospedaje);
  }
}
