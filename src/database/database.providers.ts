import { Sequelize } from 'sequelize-typescript';
import { Admins } from 'src/admins/admins.entity';
import { Products } from '../products/products.entity';
import { SEQUELIZE } from '../utils/constants';
import { MY_SQL } from '../utils/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = process.env.CLEARDB_DATABASE_URL
        ? new Sequelize(process.env.CLEARDB_DATABASE_URL)
        : new Sequelize({
            dialect: MY_SQL,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: MY_SQL,
          });
      sequelize.addModels([Products, Admins]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
