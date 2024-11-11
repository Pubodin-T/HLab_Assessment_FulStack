import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';  // เปิดการนำเข้า Product Entity
import { ProductLocale } from './products/entities/product-locale.entity';  // เปิดการนำเข้า ProductLocale Entity
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Oat13392',
      database: 'postgres',
      entities: [Product, ProductLocale],  // ระบุ Entity ที่จะใช้ใน TypeORM
      synchronize: true,  // ใช้ true ในการซิงค์โครงสร้างฐานข้อมูล (ระวังใช้ในโปรดักชัน)
    }),
  ],
  controllers: [AppController],  // ตรวจสอบว่า AppController ถูกรวมไว้ที่นี่
  providers: [AppService],
})
export class AppModule {}
