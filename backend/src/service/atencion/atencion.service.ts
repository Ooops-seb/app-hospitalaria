import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAtencionMedicaDto } from './dto/update-atencion-medica.dto';
import { CreateAtencionMedicaDto } from './dto/create-atencion-medica.dto';
import { AtencionMedica } from './entities/atencion.entity';
import { ServicioService } from '../service.service';

@Injectable()
export class AtencionMedicaService extends ServicioService {
  constructor(
    @InjectRepository(AtencionMedica)
    private readonly atencionRepo: Repository<AtencionMedica>,
  ) {
    super(atencionRepo);
  }

  create(dto: CreateAtencionMedicaDto): Promise<AtencionMedica> {
    const entity = this.atencionRepo.create(dto);
    return this.atencionRepo.save(entity);
  }

  findAll(): Promise<AtencionMedica[]> {
    return this.atencionRepo.find();
  }

  async findOne(id: number): Promise<AtencionMedica> {
    const entity = await this.atencionRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('AtencionMedica no encontrada');
    return entity;
  }

  async update(
    id: number,
    dto: UpdateAtencionMedicaDto,
  ): Promise<AtencionMedica> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.atencionRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.atencionRepo.remove(entity);
  }
}
