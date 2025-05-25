import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/Producto.entity';
import { ChangeStatusDto } from '../service/common/dtos/change-status.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Producto)
    private readonly productRepo: Repository<Producto>,
  ) {}

  async changeStatus(id: number, dto: ChangeStatusDto): Promise<Producto> {
    const entity = await this.productRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Producto no encontrado');
    entity.estado = dto.estado;
    return this.productRepo.save(entity);
  }
}
