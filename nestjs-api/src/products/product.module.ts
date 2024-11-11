import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';  // นำเข้า ProductController
import { ProductService } from './product.service';  // นำเข้า ProductService
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductLocale } from './entities/product-locale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductLocale])],
  controllers: [ProductController],  // ตรวจสอบว่า ProductController ถูกประกาศที่นี่
  providers: [ProductService],  // ตรวจสอบว่า ProductService ถูกประกาศที่นี่
})
export class ProductModule {}