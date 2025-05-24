import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('DocumentoTransaccional')
@Controller('documento_transaccional')
export class DocumentController {
  // constructor(private readonly documentService: DocumentService) {}
  // @Post()
  // create(@Body() createDocumentDto: CreateDocumentoTransaccionalDto) {
  //   return this.documentService.create(createDocumentDto);
  // }
  // @Get()
  // findAll() {
  //   return this.documentService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.documentService.findOne(+id);
  // }
  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateDocumentDto: UpdateDocumentoTransaccionalDto,
  // ) {
  //   return this.documentService.update(+id, updateDocumentDto);
  // }
  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.documentService.remove(+id);
  // }
}
