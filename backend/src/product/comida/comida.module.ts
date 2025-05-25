import { Module } from '@nestjs/common';
import { ComidaService } from './comida.service';
import { ComidaController } from './comida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comida } from './entities/comida.entity';
import { Producto } from '../entities/Producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comida, Producto])],
  controllers: [ComidaController],
  providers: [ComidaService],
})
export class ComidaModule {}
