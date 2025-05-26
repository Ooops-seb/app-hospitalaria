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
import { FacturaService } from 'src/line/factura/factura.service';
import { LineaFactura } from '../../line/factura/entities/factura.entity';
import { EstadosEnum } from 'common/enums/Estado.enum';
import { Factura } from '../factura/entities/factura.entity';
import { DocumentService } from '../document.service';
import { LineaDescargo } from 'src/line/descargo/entities/descargo.entity';

@Injectable()
export class DescargoService extends DocumentService {
  constructor(
    @InjectRepository(Descargo)
    private readonly descargoRepo: Repository<Descargo>,
    @Inject(forwardRef(() => LineaDescargoService))
    private readonly lineaDescargoService: LineaDescargoService,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    @Inject(forwardRef(() => FacturaService))
    private readonly lineaFacturaService: FacturaService,
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
    @InjectRepository(LineaDescargo)
    private readonly lineaDescargoRepo: Repository<LineaDescargo>,
  ) {
    super(descargoRepo);
  }

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

  async clonarADocumentoFactura(
    descargoId: number,
    clave_acceso: string,
  ): Promise<{ factura: Factura; lineas: LineaFactura[] }> {
    // 1. Buscar el descargo y sus relaciones completas
    const descargo = await this.descargoRepo.findOne({
      where: { id: descargoId },
      relations: ['paciente'],
    });
    if (!descargo) throw new BadRequestException('Descargo no encontrado');

    // 2. Cargar líneas y sus relaciones producto y servicio
    const lineas = await this.lineaDescargoRepo.find({
      where: { descargo: { id: descargoId } },
      relations: ['producto', 'servicio'],
    });
    descargo.lineas = lineas;

    if (descargo.estado !== EstadosEnum.DESCARGADO) {
      throw new BadRequestException(
        'El descargo debe estar en estado DESCARGADO para facturarse',
      );
    }
    if (!descargo.lineas?.length) {
      throw new BadRequestException(
        'El descargo no tiene líneas para facturar',
      );
    }
    if (descargo.lineas.some((l) => l.estado !== EstadosEnum.DESCARGADO)) {
      throw new BadRequestException(
        'Todas las líneas deben estar en estado DESCARGADO',
      );
    }

    // 3. Crear la factura (con relaciones usando TypeORM)
    const factura = this.facturaRepo.create({
      clave_acceso,
      total: 0,
      cliente: descargo.cliente,
      direccion: descargo.direccion,
      fecha: descargo.fecha,
      paciente: descargo.paciente, // Relación directa, objeto completo
      estado: EstadosEnum.DESCARGADO,
    });
    await this.facturaRepo.save(factura);

    // 4. Clonar las líneas de descargo a líneas de factura, usando relaciones completas
    const lineasFactura: Partial<LineaFactura>[] = descargo.lineas.map(
      (linea) => {
        return {
          estado: EstadosEnum.DESCARGADO,
          factura: factura, // Relación directa
          producto: linea.producto ?? null, // Relación directa
          servicio: linea.servicio ?? null, // Relación directa
        };
      },
    );
    try {
      await this.lineaFacturaService.createMany(lineasFactura);
    } catch (error) {
      await this.facturaRepo.delete(factura.id);
      throw new BadRequestException(
        'Error al crear líneas de factura: ' + error.message,
      );
    }

    // 5. Actualizar estados y referencias
    await this.lineaDescargoRepo.update(
      { descargo: { id: descargo.id } },
      { estado: EstadosEnum.FACTURADO },
    );
    descargo.estado = EstadosEnum.FACTURADO;
    descargo.factura = factura;
    await this.descargoRepo.save(descargo);

    // 6. Recargar factura y líneas con relaciones completas
    const facturaCompleta = await this.facturaRepo.findOne({
      where: { id: factura.id },
      relations: ['paciente'],
    });
    if (!facturaCompleta) {
      throw new BadRequestException('No se pudo recargar la factura creada');
    }
    const lineaFacturaRepo = this.lineaFacturaService.lineaFacturaRepo;
    const lineasFacturaCompletas = await lineaFacturaRepo.find({
      where: { factura: { id: factura.id } },
      // relations: ['producto', 'servicio'],
    });
    return { factura: facturaCompleta, lineas: lineasFacturaCompletas };
  }
}
