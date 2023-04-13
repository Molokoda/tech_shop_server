import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { adminsProviders } from './admins.providers';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, ...adminsProviders],
})
export class AdminsModule {}
