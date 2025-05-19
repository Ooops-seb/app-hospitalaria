import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentoTransaccionalDto } from './dto/create-document.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDocumentoTransaccionalDto } from './dto/update-document.dto';

@ApiTags('DocumentoTransaccional')
@Controller('documento_transaccional')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentoTransaccionalDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentoTransaccionalDto,
  ) {
    return this.documentService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.remove(+id);
  }
}
