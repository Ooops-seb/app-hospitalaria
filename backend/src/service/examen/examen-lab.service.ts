import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenLabDto } from './dto/create-examen-lab.dto';
import { UpdateExamenLabDto } from './dto/update-examen-lab.dto';
import { ExamenLab } from './entities/ExamenLab.entity';
import { ServicioService } from '../service.service';

@Injectable()
export class ExamenLabService extends ServicioService {
  constructor(
    @InjectRepository(ExamenLab)
    private readonly examenRepo: Repository<ExamenLab>,
  ) {
    super(examenRepo);
  }

  create(dto: CreateExamenLabDto): Promise<ExamenLab> {
    const entity = this.examenRepo.create(dto);
    return this.examenRepo.save(entity);
  }

  findAll(): Promise<ExamenLab[]> {
    return this.examenRepo.find();
  }

  async findOne(id: number): Promise<ExamenLab> {
    const entity = await this.examenRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('ExamenLab no encontrado');
    return entity;
  }

  async update(id: number, dto: UpdateExamenLabDto): Promise<ExamenLab> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.examenRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.examenRepo.remove(entity);
  }
}
