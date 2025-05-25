import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComidaDto } from './dto/create-comida.dto';
import { UpdateComidaDto } from './dto/update-comida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comida } from './entities/comida.entity';
import { ProductService } from '../product.service';

@Injectable()
export class ComidaService extends ProductService {
  constructor(
    @InjectRepository(Comida)
    private readonly comidaRepo: Repository<Comida>,
  ) {
    super(comidaRepo);
  }

  create(dto: CreateComidaDto): Promise<Comida> {
    const comida = this.comidaRepo.create(dto);
    return this.comidaRepo.save(comida);
  }

  findAll(): Promise<Comida[]> {
    return this.comidaRepo.find();
  }

  async findOne(id: number): Promise<Comida> {
    const comida = await this.comidaRepo.findOne({ where: { id } });
    if (!comida) throw new NotFoundException('Comida no encontrada');
    return comida;
  }

  async update(id: number, dto: UpdateComidaDto): Promise<Comida> {
    const comida = await this.findOne(id);
    Object.assign(comida, dto);
    return this.comidaRepo.save(comida);
  }

  async remove(id: number): Promise<void> {
    const comida = await this.findOne(id);
    await this.comidaRepo.remove(comida);
  }
}
