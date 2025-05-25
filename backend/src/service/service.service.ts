import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Servicio } from './entities/Servicio.entity';
import { ChangeStatusDto } from './common/dtos/change-status.dto';

@Injectable()
export class ServicioService {
  constructor(private readonly serviceRepository: Repository<Servicio>) {}

  async changeStatus({
    id,
    dto,
  }: {
    id: number;
    dto: ChangeStatusDto;
  }): Promise<Servicio> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    service.estado = dto.estado;
    return this.serviceRepository.save(service);
  }
}
