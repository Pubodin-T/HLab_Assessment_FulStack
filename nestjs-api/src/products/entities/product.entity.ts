import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductLocale } from './product-locale.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column('decimal')
  price: number;

  @OneToMany(() => ProductLocale, (locale) => locale.product)
  locales: ProductLocale[];
}
