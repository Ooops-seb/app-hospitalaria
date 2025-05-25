import { Injectable } from '@nestjs/common';
import { CreateDescargoDto } from './dto/create-descargo.dto';
import { UpdateDescargoDto } from './dto/update-descargo.dto';

@Injectable()
export class DescargoService {
  create(createDescargoDto: CreateDescargoDto) {
    return 'This action adds a new descargo';
  }

  findAll() {
    return `This action returns all descargo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} descargo`;
  }

  update(id: number, updateDescargoDto: UpdateDescargoDto) {
    return `This action updates a #${id} descargo`;
  }

  remove(id: number) {
    return `This action removes a #${id} descargo`;
  }
}
