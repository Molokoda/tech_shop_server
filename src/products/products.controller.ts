import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UploadedFile,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as Res } from 'express';
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
  @Get()
  async getAll(@Response() res: Res): Promise<Res> {
    const products = await this.productsService.getAll();
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.set({ 'X-Total-Count': `${products.length}` }).json(products);
  }

  @UseGuards(AdminsGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: 'public' }))
  create(
    @Body() createProduct: CreateProdutctDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Products> {
    return this.productsService.create(createProduct, file);
  }

  @UseGuards(AdminsGuard)
  @Put(controllerConstants.DECORATION_ID)
  @UseInterceptors(FileInterceptor('file', { dest: 'public' }))
  update(
    @Body() updateProduct: UpdateProductDto,
    @Param(controllerConstants.PARAM_ID) id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Products> {
    return this.productsService.update(updateProduct, id, file);
  }

  @UseGuards(AdminsGuard)
  @Delete(controllerConstants.DECORATION_ID)
  delete(@Param(controllerConstants.PARAM_ID) id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
