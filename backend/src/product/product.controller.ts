import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async getProductsList() {
    return this.productService.getProductsList();
  }
}
