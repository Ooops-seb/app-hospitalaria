import {
  forwardRef,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDescargoDto } from './dto/create-descargo.dto';
import { UpdateDescargoDto } from './dto/update-descargo.dto';
import { Descargo } from './entities/descargo.entity';
import { Paciente } from '../../patient/entities/patient.entity';
import { DescargoService as LineaDescargoService } from 'src/line/descargo/descargo.service';

@Injectable()
export class DescargoService {
  constructor(
    @InjectRepository(Descargo)
    private readonly descargoRepo: Repository<Descargo>,
    @Inject(forwardRef(() => LineaDescargoService))
    private readonly lineaDescargoService: LineaDescargoService,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async create(createDescargoDto: CreateDescargoDto) {
    const { fecha, direccion, cliente, paciente_id, lineas } =
      createDescargoDto;
    const paciente = await this.pacienteRepo.findOneBy({ id: paciente_id });
    if (!paciente) throw new BadRequestException('Paciente no encontrado');

    const descargo = this.descargoRepo.create({
      fecha,
      direccion,
      cliente,
      paciente,
    });
    await this.descargoRepo.save(descargo);

    const lineasEntities = await this.lineaDescargoService.createMany(
      lineas,
      descargo,
    );
    descargo.lineas = lineasEntities;
    return descargo;
  }

  async findAll() {
    const descargos = await this.descargoRepo.find({ relations: ['paciente'] });
    for (const descargo of descargos) {
      const lineas = await this.lineaDescargoService['lineaDescargoRepo'].find({
        where: { descargo: { id: descargo.id } },
        relations: ['producto', 'servicio'],
      });
      descargo.lineas = lineas;
    }
    return descargos;
  }

  async findOne(id: number) {
    const descargo = await this.descargoRepo.findOne({
      where: { id },
      relations: ['paciente'],
    });
    if (!descargo) return null;
    const lineas = await this.lineaDescargoService['lineaDescargoRepo'].find({
      where: { descargo: { id } },
      relations: ['producto', 'servicio'],
    });
    descargo.lineas = lineas;
    return descargo;
  }

  async update(id: number, updateDescargoDto: UpdateDescargoDto) {
    await this.descargoRepo.update(id, updateDescargoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.descargoRepo.delete(id);
    return { deleted: true };
  }
}
