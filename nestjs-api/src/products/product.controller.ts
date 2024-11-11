import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('search')
  search(@Query() searchProductDto: SearchProductDto) {
    return this.productService.search(searchProductDto);
  }
  @Get()  // นี่จะจับ route /products
  findAll() {
    return 'List of products';  // ตัวอย่างการตอบกลับ
  }
}
