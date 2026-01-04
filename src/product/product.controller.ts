import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
