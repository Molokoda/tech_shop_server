import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsProviders } from './products.providers';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
