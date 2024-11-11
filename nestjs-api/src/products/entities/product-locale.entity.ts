import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductLocale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language_code: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Product, (product) => product.locales)
  product: Product;
}
