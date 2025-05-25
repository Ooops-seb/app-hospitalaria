import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './entities/Documento.entity';
import { ChangeStatusDto } from '../service/common/dtos/change-status.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentRepo: Repository<Documento>,
  ) {}

  async changeStatus(id: number, dto: ChangeStatusDto): Promise<Documento> {
    const entity = await this.documentRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Documento no encontrado');
    entity.estado = dto.estado;
    return this.documentRepo.save(entity);
  }
}
