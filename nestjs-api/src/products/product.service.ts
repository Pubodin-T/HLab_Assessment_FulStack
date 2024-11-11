import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductLocale } from './entities/product-locale.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductLocale)
    private productLocaleRepository: Repository<ProductLocale>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.save({
      sku: createProductDto.sku,
      price: createProductDto.price,
    });

    for (const [language, { name, description }] of Object.entries(
      createProductDto.translations,
    )) {
      await this.productLocaleRepository.save({
        product_id: product.id,
        language_code: language,
        name,
        description,
      });
    }

    return product;
  }

  async search(searchProductDto: SearchProductDto) {
    const { languageCode, searchQuery, page, limit } = searchProductDto;

    const [products, total] = await this.productRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.locales', 'pl', 'pl.language_code = :languageCode', {
        languageCode,
      })
      .where('pl.name ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
