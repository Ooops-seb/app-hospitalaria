import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaTransaccion } from './entities/LineaTransaccion.entity';
import { ChangeStatusLineaDto } from './entities/dto/change-status-linea.dto';

@Injectable()
export class LineaTransaccionService {
  constructor(
    @InjectRepository(LineaTransaccion)
    private readonly lineaRepo: Repository<LineaTransaccion>,
  ) {}

  async changeStatus(
    id: number,
    dto: ChangeStatusLineaDto,
  ): Promise<LineaTransaccion> {
    const entity = await this.lineaRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('LineaTransaccion no encontrada');
    entity.estado = dto.estado;
    return this.lineaRepo.save(entity);
  }
}
