import { Admins } from './admins.entity';
import { ADMIN_REPOSITORY } from 'src/utils/constants';

export const adminsProviders = [
  {
    provide: ADMIN_REPOSITORY,
    useValue: Admins,
  },
];
