import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Factura')
@Controller('factura')
export class FacturaController {
  // constructor(private readonly service: FacturaService) {}
  // @Post()
  // create(@Body() dto: CreateFacturaDto) {
  //   return this.service.create(dto);
  // }
  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.service.findOne(id);
  // }
  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFacturaDto) {
  //   return this.service.update(id, dto);
  // }
  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.service.remove(id);
  // }
}
