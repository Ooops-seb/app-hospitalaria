import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-patient.dto';
import { UpdatePacienteDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/patient.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    return this.pacienteRepository.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ id });
    if (!paciente) {
      throw new NotFoundError(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async update(
    id: number,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    await this.pacienteRepository.update(id, updatePacienteDto);
    const paciente = await this.pacienteRepository.findOneBy({ id });
    if (!paciente) {
      throw new NotFoundError(`Paciente with id ${id} not found after update`);
    }
    return paciente;
  }

  async remove(id: number): Promise<void> {
    await this.pacienteRepository.delete(id);
  }
}
