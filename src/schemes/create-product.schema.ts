import { object, string, number } from 'yup';
import { messages, productsConstants } from 'src/utils/constants';

export const createProductSchema = object().shape({
  name: string()
    .required(messages.products.NAME_IS_REQUIRED)
    .min(
      productsConstants.name.min,
      messages.products.NAME_MIN_LENGTH(productsConstants.name.min),
    )
    .max(
      productsConstants.name.max,
      messages.products.NAME_MAX_LENGTH(productsConstants.name.max),
    ),
  price: number()
    .required(messages.products.PRICE_IS_REQUIRED)
    .min(
      productsConstants.price.min,
      messages.products.PRICE_MIN_VALUE(productsConstants.price.min),
    )
    .max(
      productsConstants.price.max,
      messages.products.PRICE_MAX_VALUE(productsConstants.price.max),
    ),
  description: string()
    .required(messages.products.DESCRIPTION_IS_REQUIRED)
    .min(
      productsConstants.descriprion.min,
      messages.products.DESCRIPTION_MIN_LENGTH(
        productsConstants.descriprion.min,
      ),
    )
    .max(
      productsConstants.descriprion.max,
      messages.products.DESCRIPTION_MAX_LENGTH(
        productsConstants.descriprion.max,
      ),
    ),
  filename: string().required(messages.products.FILENAME_REQUIRED),
});
