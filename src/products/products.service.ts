import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PRODUCTS_REPOSITORY, messages } from 'src/utils/constants';
import { CreateProdutctDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './products.entity';
import { checkErrorInstance } from 'src/utils/checkErrorInstance';
import { createProductSchema } from 'src/schemes/create-product.schema';
import { updateProductSchema } from 'src/schemes/update-product.schema';

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

  async create(createProduct: CreateProdutctDto): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        where: { name: createProduct.name },
      });
      if (product) {
        throw new BadRequestException(messages.products.PRODUCT_ALREADY_EXIST);
      }
      await createProductSchema.validate({ ...createProduct });
      return await this.productsRepository.create<Products>({
        ...createProduct,
      });
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async update(updateProduct: UpdateProductDto, id: string): Promise<Products> {
    try {
      await updateProductSchema.validate({ ...updateProduct });
      const product = await this.productsRepository.findByPk<Products>(id);
      if (!product) {
        throw new NotFoundException(messages.products.PRODUCT_NOT_FOUND);
      }
      product.set({ ...updateProduct });
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
      await product.destroy();
      return messages.products.DELETE_SUCCESS;
    } catch (error) {
      checkErrorInstance(error);
    }
  }
}
