import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // 🔓 Public – list products
  @Get()
  async getAll() {
    return this.productService.findAll();
  }

  // 🔓 Public – get one product
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // 🔐 Protected – create product (ADMIN later)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // 🔐 DELETE PRODUCT
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
