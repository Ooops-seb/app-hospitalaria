import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('servicios')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('list')
  getServiciosList() {
    return this.serviceService.getServiciosList();
  }
}
