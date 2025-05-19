import { Injectable, NotFoundException } from '@nestjs/common';
import { Factura } from './entities/Factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { Repository } from 'typeorm';
import { DocumentoTransaccional } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
    @InjectRepository(DocumentoTransaccional)
    private readonly docRepo: Repository<DocumentoTransaccional>,
  ) {}

  async create(dto: CreateFacturaDto): Promise<Factura> {
    const documento = await this.docRepo.findOneBy({ id: dto.documento_id });
    if (!documento)
      throw new NotFoundException('DocumentoTransaccional no encontrado');
    const factura = this.facturaRepo.create({
      clave_acceso: dto.clave_acceso,
      documento,
    });
    return this.facturaRepo.save(factura);
  }

  findAll(): Promise<Factura[]> {
    return this.facturaRepo.find();
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  async update(id: number, dto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.findOne(id);
    if (dto.documento_id !== undefined) {
      const documento = await this.docRepo.findOneBy({ id: dto.documento_id });
      if (!documento)
        throw new NotFoundException('DocumentoTransaccional no encontrado');
      factura.documento = documento;
    }
    if (dto.clave_acceso !== undefined) factura.clave_acceso = dto.clave_acceso;
    return this.facturaRepo.save(factura);
  }

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    await this.facturaRepo.remove(factura);
  }
}
