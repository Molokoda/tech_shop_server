import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { PRODUCTS_REPOSITORY, messages } from 'src/utils/constants';
import { CreateProdutctDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './products.entity';
import { checkErrorInstance } from 'src/utils/checkErrorInstance';
import { createProductSchema } from 'src/schemes/create-product.schema';
import { updateProductSchema } from 'src/schemes/update-product.schema';
import { join } from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private productsRepository: typeof Products,
  ) {}

  async getOne(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findByPk<Products>(id);
      if (!product) {
        throw new NotFoundException(messages.products.PRODUCT_NOT_FOUND);
      }
      return product;
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async getAll(): Promise<Products[]> {
    try {
      const products = await this.productsRepository.findAll();
      return products;
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async create(
    createProduct: CreateProdutctDto,
    file: Express.Multer.File,
  ): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        where: { name: createProduct.name },
      });
      if (product) {
        throw new BadRequestException(messages.products.PRODUCT_ALREADY_EXIST);
      }
      await createProductSchema.validate({
        ...createProduct,
        filename: file?.filename,
      });
      return await this.productsRepository.create<Products>({
        ...createProduct,
        filename: file?.filename,
      });
    } catch (error) {
      fs.unlink(
        `${join(__dirname, '../..', 'public')}\\${file?.filename}`,
        (err) => {
          console.log(err);
        },
      );
      checkErrorInstance(error);
    }
  }

  async update(
    updateProduct: UpdateProductDto,
    id: string,
    file: Express.Multer.File,
  ): Promise<Products> {
    try {
      await updateProductSchema.validate({
        ...updateProduct,
      });
      const product = await this.productsRepository.findByPk<Products>(id);
      if (!product) {
        throw new NotFoundException(messages.products.PRODUCT_NOT_FOUND);
      }
      if (file && product?.filename) {
        fs.unlink(
          `${join(__dirname, '../..', 'public')}\\${product?.filename}`,
          (err) => {
            console.log(err);
          },
        );
        product.set({ ...updateProduct, filename: file.filename });
      } else if (file) {
        product.set({ ...updateProduct, filename: file.filename });
      } else {
        product.set({ ...updateProduct });
      }
      return product.save();
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const product = await this.productsRepository.findByPk<Products>(id);
      if (!product) {
        throw new NotFoundException(messages.products.PRODUCT_NOT_FOUND);
      }
      fs.unlink(
        `${join(__dirname, '../..', 'public')}\\${product.filename}`,
        (err) => {
          console.log(err);
        },
      );
      await product.destroy();
      return messages.products.DELETE_SUCCESS;
    } catch (error) {
      checkErrorInstance(error);
    }
  }
}
