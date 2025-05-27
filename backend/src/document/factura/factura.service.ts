import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { LineaFactura } from 'src/line/factura/entities/factura.entity';
import { Documento } from '../entities/Documento.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
    @InjectRepository(LineaFactura)
    private readonly lineaFacturaRepo: Repository<LineaFactura>,
    @InjectRepository(Documento)
    private readonly documentoRepo: Repository<Documento>,
  ) {}

  async findAllWithRelations(): Promise<Factura[]> {
    return this.facturaRepo.find({
      relations: {
        paciente: true,
        lineas: {
          producto: true,
          servicio: true,
        },
      },
      order: { id: 'DESC' },
    });
  }

  async findOneWithRelations(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOne({
      where: { id },
      relations: {
        paciente: true,
        lineas: {
          producto: true,
          servicio: true,
        },
      },
    });
    if (!factura) throw new Error('Factura no encontrada');
    return factura;
  }
}
