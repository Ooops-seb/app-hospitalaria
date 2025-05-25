import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImagenRayosXDto } from './dto/create-imagen.dto';
import { UpdateImagenRayosXDto } from './dto/update-imagen.dto';
import { ImagenRayosX } from './entities/ImagenRayosX.entity';
import { ServicioService } from '../service.service';

@Injectable()
export class ImagenService extends ServicioService {
  constructor(
    @InjectRepository(ImagenRayosX)
    private readonly imagenRepo: Repository<ImagenRayosX>,
  ) {
    super(imagenRepo);
  }

  create(dto: CreateImagenRayosXDto): Promise<ImagenRayosX> {
    const entity = this.imagenRepo.create(dto);
    return this.imagenRepo.save(entity);
  }

  findAll(): Promise<ImagenRayosX[]> {
    return this.imagenRepo.find();
  }

  async findOne(id: number): Promise<ImagenRayosX> {
    const entity = await this.imagenRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('ImagenRayosX no encontrada');
    return entity;
  }

  async update(id: number, dto: UpdateImagenRayosXDto): Promise<ImagenRayosX> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.imagenRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.imagenRepo.remove(entity);
  }
}
