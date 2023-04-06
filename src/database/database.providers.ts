import { Sequelize } from 'sequelize-typescript';
import { Products } from '../products/products.entity';
import { SEQUELIZE } from '../utils/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'SomeTestPassword',
        database: 'mysql',
      });
      sequelize.addModels([Products]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
