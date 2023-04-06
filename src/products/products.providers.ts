import { Products } from './products.entity';
import { PRODUCTS_REPOSITORY } from 'src/utils/constants';

export const productsProviders = [
  {
    provide: PRODUCTS_REPOSITORY,
    useValue: Products,
  },
];
