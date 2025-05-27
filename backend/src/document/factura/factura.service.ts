import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { LineaFactura } from 'src/line/factura/entities/factura.entity';
import { Documento } from '../entities/Documento.entity';
import { UpdateLineaFacturaDto } from 'src/line/factura/dto/update-lineafactura.dto';
import { EstadosEnum } from 'common/enums/Estado.enum';

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
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  async update(id: number, dto: any): Promise<Factura> {
    // Actualiza los datos principales de la factura
    const factura = await this.facturaRepo.findOne({
      where: { id },
      relations: { lineas: { producto: true, servicio: true } },
    });
    if (factura?.estado === EstadosEnum.FACTURADO)
      throw new BadRequestException('Esta factura no puede ser editada');
    if (!factura) throw new NotFoundException('Factura no encontrada');
    if (dto.clave_acceso !== undefined) {
      factura.clave_acceso = dto.clave_acceso;
    }
    if (dto.total !== undefined) {
      factura.total = dto.total;
    }
    if (dto.direccion !== undefined) {
      factura.direccion = dto.direccion;
    }
    // No se permite cambiar documento_id, paciente ni estado
    // Actualiza las líneas si vienen en el body
    if (dto.lineas && Array.isArray(dto.lineas)) {
      for (const lineaDto of dto.lineas) {
        if (!lineaDto.id) continue;
        const linea = factura.lineas.find((l) => l.id === lineaDto.id);
        if (!linea) continue;
        // Solo actualiza campos permitidos
        const updateDto: UpdateLineaFacturaDto = lineaDto;
        if (updateDto.cantidad !== undefined) {
          linea.cantidad = updateDto.cantidad;
        }
        if (updateDto.iva !== undefined) {
          linea.iva = updateDto.iva;
        }
        if (updateDto.subtotal !== undefined) {
          linea.subtotal = updateDto.subtotal;
        }
        if (updateDto.descuento !== undefined) {
          linea.descuento = updateDto.descuento;
        }
        // No se permite cambiar producto, servicio, ni estado
        await this.lineaFacturaRepo.save(linea);
      }
    }
    await this.facturaRepo.save(factura);
    return this.findOneWithRelations(id);
  }

  async facturar(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOne({
      where: { id },
      relations: { lineas: true },
    });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    if (factura.estado === EstadosEnum.FACTURADO)
      throw new BadRequestException('La factura ya está facturada');
    factura.estado = EstadosEnum.FACTURADO;
    for (const linea of factura.lineas) {
      linea.estado = EstadosEnum.FACTURADO;
      await this.lineaFacturaRepo.save(linea);
    }
    await this.facturaRepo.save(factura);
    return this.findOneWithRelations(id);
  }
}
