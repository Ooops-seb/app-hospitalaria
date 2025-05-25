import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLineaDescargoDto } from './dto/create-lineadescargo.dto';
import { Producto } from 'src/product/entities/Producto.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import { LineaDescargo } from './entities/descargo.entity';

@Injectable()
export class DescargoService {
  constructor(
    @InjectRepository(LineaDescargo)
    private readonly lineaDescargoRepo: Repository<LineaDescargo>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}

  async createMany(
    lineas: CreateLineaDescargoDto[],
    descargo: any,
  ): Promise<LineaDescargo[]> {
    const lineasEntities: LineaDescargo[] = [];
    for (const linea of lineas) {
      const producto = linea.producto_id
        ? { id: linea.producto_id }
        : undefined;
      const servicio = linea.servicio_id
        ? { id: linea.servicio_id }
        : undefined;
      const lineaEntity = this.lineaDescargoRepo.create({
        producto,
        servicio,
        nota_venta: linea.nota_venta,
        descargo,
      });
      lineasEntities.push(lineaEntity);
    }
    await this.lineaDescargoRepo.save(lineasEntities);
    return lineasEntities;
  }
}
