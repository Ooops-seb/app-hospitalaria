import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaTransaccionService } from '../linea-transaccion.service';
import { LineaFactura } from './entities/factura.entity';

@Injectable()
export class FacturaService extends LineaTransaccionService {
  constructor(
    @InjectRepository(LineaFactura)
    public readonly lineaFacturaRepo: Repository<LineaFactura>,
  ) {
    super(lineaFacturaRepo);
  }

  async createMany(lineas: Partial<LineaFactura>[]): Promise<LineaFactura[]> {
    const entities = this.lineaFacturaRepo.create(lineas);
    return this.lineaFacturaRepo.save(entities);
  }
}
