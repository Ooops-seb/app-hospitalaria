import { Injectable } from '@nestjs/common';
// import { LineaTransaccion } from './entities/LineaTransaccion.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Factura } from 'src/document/entities/Factura.entity';
// import { Producto } from 'src/product/entities/product.entity';
// import { Servicio } from 'src/service/entities/Servicio.entity';
// import { CreateLineaDeTransaccionDto } from './dto/create-linea-transaccion.dto';
// import { UpdateLineaDeTransaccionDto } from './dto/update-linea-transaccion.dto';

@Injectable()
export class LineaTransaccionService {
  // constructor(
  //   @InjectRepository(LineaTransaccion)
  //   private readonly lineaRepo: Repository<LineaTransaccion>,
  //   @InjectRepository(Factura)
  //   private readonly facturaRepo: Repository<Factura>,
  //   @InjectRepository(Producto)
  //   private readonly productoRepo: Repository<Producto>,
  //   @InjectRepository(Servicio)
  //   private readonly servicioRepo: Repository<Servicio>,
  // ) {}
  // async create(dto: CreateLineaDeTransaccionDto): Promise<LineaTransaccion> {
  //   const factura = await this.facturaRepo.findOneBy({ id: dto.factura_id });
  //   if (!factura) throw new NotFoundException('Factura no encontrada');
  //   let producto: Producto | undefined;
  //   let servicio: Servicio | undefined;
  //   if (dto.producto_id) {
  //     const foundProducto = await this.productoRepo.findOneBy({
  //       id: dto.producto_id,
  //     });
  //     if (!foundProducto) throw new NotFoundException('Producto no encontrado');
  //     producto = foundProducto;
  //   }
  //   if (dto.servicio_id) {
  //     const foundServicio = await this.servicioRepo.findOneBy({
  //       id: dto.servicio_id,
  //     });
  //     if (!foundServicio) throw new NotFoundException('Servicio no encontrado');
  //     servicio = foundServicio;
  //   }
  //   const entity = this.lineaRepo.create({
  //     cantidad: dto.cantidad,
  //     precio_unitario: dto.precio_unitario,
  //     factura,
  //     producto,
  //     servicio,
  //   });
  //   return this.lineaRepo.save(entity);
  // }
  // findAll(): Promise<LineaTransaccion[]> {
  //   return this.lineaRepo.find();
  // }
  // async findOne(id: number): Promise<LineaTransaccion> {
  //   const entity = await this.lineaRepo.findOne({ where: { id } });
  //   if (!entity) throw new NotFoundException('LineaTransaccion no encontrada');
  //   return entity;
  // }
  // async update(
  //   id: number,
  //   dto: UpdateLineaDeTransaccionDto,
  // ): Promise<LineaTransaccion> {
  //   const entity = await this.findOne(id);
  //   if (dto.factura_id) {
  //     const factura = await this.facturaRepo.findOneBy({ id: dto.factura_id });
  //     if (!factura) throw new NotFoundException('Factura no encontrada');
  //     entity.factura = factura;
  //   }
  //   if (dto.producto_id !== undefined) {
  //     if (dto.producto_id === null) {
  //       entity.producto = null;
  //     } else {
  //       const producto = await this.productoRepo.findOneBy({
  //         id: dto.producto_id,
  //       });
  //       if (!producto) throw new NotFoundException('Producto no encontrado');
  //       entity.producto = producto;
  //     }
  //   }
  //   if (dto.servicio_id !== undefined) {
  //     if (dto.servicio_id === null) {
  //       entity.servicio = null;
  //     } else {
  //       const servicio = await this.servicioRepo.findOneBy({
  //         id: dto.servicio_id,
  //       });
  //       if (!servicio) throw new NotFoundException('Servicio no encontrado');
  //       entity.servicio = servicio;
  //     }
  //   }
  //   if (dto.cantidad !== undefined) entity.cantidad = dto.cantidad;
  //   if (dto.precio_unitario !== undefined)
  //     entity.precio_unitario = dto.precio_unitario;
  //   return this.lineaRepo.save(entity);
  // }
  // async remove(id: number): Promise<void> {
  //   const entity = await this.findOne(id);
  //   await this.lineaRepo.remove(entity);
  // }
}
