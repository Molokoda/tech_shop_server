import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateProdutctDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';
import { controllerConstants } from 'src/utils/constants';
import { AdminsGuard } from 'src/admins/admins.guard';

@Controller(controllerConstants.PRODUCTS)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminsGuard)
  @Get(controllerConstants.DECORATION_ID)
  getOne(@Param(controllerConstants.PARAM_ID) id: string): Promise<Products> {
    return this.productsService.getOne(id);
  }

  @UseGuards(AdminsGuard)
  @Post()
  create(@Body() createProduct: CreateProdutctDto): Promise<Products> {
    return this.productsService.create(createProduct);
  }

  @UseGuards(AdminsGuard)
  @Put(controllerConstants.DECORATION_ID)
  update(
    @Body() updateProduct: UpdateProductDto,
    @Param(controllerConstants.PARAM_ID) id: string,
  ): Promise<Products> {
    return this.productsService.update(updateProduct, id);
  }

  @UseGuards(AdminsGuard)
  @Delete(controllerConstants.DECORATION_ID)
  delete(@Param(controllerConstants.PARAM_ID) id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
