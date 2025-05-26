import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLineaDescargoDto } from './dto/create-lineadescargo.dto';
import { Producto } from 'src/product/entities/Producto.entity';
import { Servicio } from 'src/service/entities/Servicio.entity';
import { LineaDescargo } from './entities/descargo.entity';
import { LineaTransaccionService } from '../linea-transaccion.service';
import { UpdateLineaDescargoDto } from './dto/update-lineadescargo.dto';
import { EstadosEnum } from 'common/enums/Estado.enum';

@Injectable()
export class DescargoService extends LineaTransaccionService {
  constructor(
    @InjectRepository(LineaDescargo)
    private readonly lineaDescargoRepo: Repository<LineaDescargo>,
    @InjectRepository(Producto)
    public readonly productoRepo: Repository<Producto>,
    @InjectRepository(Servicio)
    public readonly servicioRepo: Repository<Servicio>,
  ) {
    super(lineaDescargoRepo);
  }

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

  async updateLineaDescargo(
    id: number,
    dto: Partial<UpdateLineaDescargoDto>,
  ): Promise<LineaDescargo> {
    const linea = await this.lineaDescargoRepo.findOne({ where: { id } });
    if (!linea) throw new BadRequestException('LineaDescargo no encontrada');

    if (linea.estado === EstadosEnum.FACTURADO) {
      throw new BadRequestException(
        'No se puede editar una línea en estado FACTURADO',
      );
    }

    if (dto.producto_id !== undefined) {
      linea.producto = dto.producto_id
        ? ({ id: dto.producto_id } as any)
        : null;
    }
    if (dto.servicio_id !== undefined) {
      linea.servicio = dto.servicio_id
        ? ({ id: dto.servicio_id } as any)
        : null;
    }
    if (dto.nota_venta !== undefined) {
      linea.nota_venta = dto.nota_venta;
    }
    if (dto.cantidad !== undefined) {
      (linea as any).cantidad = dto.cantidad;
    }

    await this.lineaDescargoRepo.save(linea);
    return linea;
  }
}
