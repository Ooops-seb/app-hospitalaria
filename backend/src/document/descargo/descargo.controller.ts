import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DescargoService } from './descargo.service';
import { CreateDescargoDto } from './dto/create-descargo.dto';
import { DocumentController } from '../document.controller';
import { DocumentService } from '../document.service';

@Controller()
export class DescargoController extends DocumentController {
  constructor(private readonly descargoService: DescargoService) {
    super(descargoService as unknown as DocumentService);
  }

  @Post()
  create(@Body() createDescargoDto: CreateDescargoDto) {
    return this.descargoService.create(createDescargoDto);
  }

  @Get()
  findAll() {
    return this.descargoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descargoService.findOne(+id);
  }
}
