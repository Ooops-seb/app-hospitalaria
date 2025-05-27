import { Module } from '@nestjs/common';
import { ImagenRayosXController } from './imagen.controller';
import { ImagenService } from './imagen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenRayosX } from './entities/ImagenRayosX.entity';
import { Servicio } from '../entities/Servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenRayosX, Servicio])],
  controllers: [ImagenRayosXController],
  providers: [ImagenService],
})
export class ImagenModule {}
