import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoTransaccional } from './entities/document.entity';
import { Paciente } from 'src/patient/entities/patient.entity';
import { FacturaController } from './factura.controller';
import { Factura } from './entities/Factura.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoTransaccional, Paciente, Factura]),
  ],
  controllers: [DocumentController, FacturaController],
  providers: [DocumentService, FacturaController],
})
export class DocumentModule {}
