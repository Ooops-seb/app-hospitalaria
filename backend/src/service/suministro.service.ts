import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuministroMedicamentoDto } from './dto/create-suministro.dto';
import { UpdateSuministroMedicamentoDto } from './dto/update-suministro.dto';
import { SuministroMedicamento } from './entities/SuministroMedicamento.entity';

@Injectable()
export class SuministroMedicamentoService {
  constructor(
    @InjectRepository(SuministroMedicamento)
    private readonly suministroRepo: Repository<SuministroMedicamento>,
  ) {}

  create(dto: CreateSuministroMedicamentoDto): Promise<SuministroMedicamento> {
    const entity = this.suministroRepo.create(dto);
    return this.suministroRepo.save(entity);
  }

  findAll(): Promise<SuministroMedicamento[]> {
    return this.suministroRepo.find();
  }

  async findOne(id: number): Promise<SuministroMedicamento> {
    const entity = await this.suministroRepo.findOne({ where: { id } });
    if (!entity)
      throw new NotFoundException('SuministroMedicamento no encontrado');
    return entity;
  }

  async update(
    id: number,
    dto: UpdateSuministroMedicamentoDto,
  ): Promise<SuministroMedicamento> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.suministroRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.suministroRepo.remove(entity);
  }
}
