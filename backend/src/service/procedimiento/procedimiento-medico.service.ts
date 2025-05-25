import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcedimientoMedicoDto } from './dto/create-procedimiento-medico.dto';
import { UpdateProcedimientoMedicoDto } from './dto/update-procedimiento-medico.dto';
import { ProcedimientoMedico } from './entities/ProcedimientoMedico.entity';
import { ServicioService } from '../service.service';

@Injectable()
export class ProcedimientoMedicoService extends ServicioService {
  constructor(
    @InjectRepository(ProcedimientoMedico)
    private readonly procedimientoRepo: Repository<ProcedimientoMedico>,
  ) {
    super(procedimientoRepo);
  }

  create(dto: CreateProcedimientoMedicoDto): Promise<ProcedimientoMedico> {
    const entity = this.procedimientoRepo.create(dto);
    return this.procedimientoRepo.save(entity);
  }

  findAll(): Promise<ProcedimientoMedico[]> {
    return this.procedimientoRepo.find();
  }

  async findOne(id: number): Promise<ProcedimientoMedico> {
    const entity = await this.procedimientoRepo.findOne({ where: { id } });
    if (!entity)
      throw new NotFoundException('ProcedimientoMedico no encontrado');
    return entity;
  }

  async update(
    id: number,
    dto: UpdateProcedimientoMedicoDto,
  ): Promise<ProcedimientoMedico> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.procedimientoRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.procedimientoRepo.remove(entity);
  }
}
