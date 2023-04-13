import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginAdminDto } from './dto/login-admin.dto';
import {
  AdminsLoginType,
  AdminsRegistrateType,
  RefreshTokensType,
} from 'src/utils/types';
import { AdminsService } from './admins.service';
import { RefreshTokensAdminDto } from './dto/refresh-tokens.admin.dto';
import { AdminsGuard } from './admins.guard';
import { adminRoutes } from 'src/utils/constants';
import { RegistrateAdminDto } from './dto/registrate-admin.dto';

@Controller(adminRoutes.ADMIN)
export class AdminsController {
  constructor(private readonly adminsServices: AdminsService) {}

  @Post(adminRoutes.LOGIN)
  login(@Body() loginAdmin: LoginAdminDto): Promise<AdminsLoginType> {
    return this.adminsServices.login(loginAdmin);
  }

  @UseGuards(AdminsGuard)
  @Post(adminRoutes.REFRESH)
  refresh(
    @Body() refreshTokensAdmin: RefreshTokensAdminDto,
  ): Promise<RefreshTokensType> {
    return this.adminsServices.refresh(refreshTokensAdmin);
  }

  @UseGuards(AdminsGuard)
  @Post()
  registrate(
    @Body() registrateAdmin: RegistrateAdminDto,
  ): Promise<AdminsRegistrateType> {
    return this.adminsServices.registrate(registrateAdmin);
  }
}
