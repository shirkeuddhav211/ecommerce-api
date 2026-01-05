import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create({
      ...dto,
      price: Number(dto.price), // ensure numeric
    });
    return this.productRepo.save(product);
  }

   // ✅ DELETE PRODUCT
  async delete(id: number): Promise<{ message: string }> {
    const result = await this.productRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return { message: 'Product deleted successfully' };
  }
}
