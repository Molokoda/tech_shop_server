export const SEQUELIZE = 'SEQUELIZE';
export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';
export const MY_SQL = 'mysql';
export const productsConstants = {
  name: {
    min: 3,
    max: 20,
  },
  price: {
    min: 1,
    max: 20000,
  },
  descriprion: {
    min: 10,
    max: 200,
  },
};

export const controllerConstants = {
  PRODUCTS: 'PRODUCTS',
  DECORATION_ID: ':id',
  PARAM_ID: 'id',
};

export const messages = {
  products: {
    PRODUCT_NOT_FOUND: 'Product with such id is not found',
    DELETE_SUCCESS: 'Product delete success',
    NAME_IS_REQUIRED: 'Name is required',
    NAME_MIN_LENGTH: (minLength: number) => `Name min length is ${minLength}`,
    NAME_MAX_LENGTH: (maxLength: number) => `Name max length is ${maxLength}`,
    PRICE_IS_REQUIRED: 'Price is required',
    PRICE_MIN_VALUE: (minPrice: number) =>
      `Price must be more or equal to ${minPrice}`,
    PRICE_MAX_VALUE: (maxPrice: number) =>
      `Price must be less or equal to ${maxPrice}`,
    DESCRIPTION_IS_REQUIRED: 'Description is required',
    DESCRIPTION_MIN_LENGTH: (minLength: number) =>
      `Description min length is ${minLength}`,
    DESCRIPTION_MAX_LENGTH: (maxLength: number) =>
      `Description max length is ${maxLength}`,
  },
};