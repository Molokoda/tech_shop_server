import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AdminsLoginType,
  AdminsRegistrateType,
  RefreshTokensType,
} from 'src/utils/types';
import { LoginAdminDto } from './dto/login-admin.dto';
import { checkErrorInstance } from 'src/utils/checkErrorInstance';
import { ADMIN_REPOSITORY, messages } from 'src/utils/constants';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from 'src/utils/constants';
import { RefreshTokensAdminDto } from './dto/refresh-tokens.admin.dto';
import { Admins } from './admins.entity';
import { RegistrateAdminDto } from './dto/registrate-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    private jwtService: JwtService,
    @Inject(ADMIN_REPOSITORY) private adminRepository: typeof Admins,
  ) {}
  private users = [
    {
      id: '1',
      username: 'John',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async login(loginAdmin: LoginAdminDto): Promise<AdminsLoginType> {
    try {
      const user = await this.adminRepository.findOne({
        where: { login: loginAdmin.login },
      });

      if (!user || user.password !== loginAdmin.password) {
        throw new NotFoundException(messages.admins.WRONG_LOGIN_OR_PASSWORD);
      }
      const [accessToken, refreshToken] = await this.createTokens(
        user.id,
        user.login,
      );
      return {
        id: user.id,
        login: user.login,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async registrate(
    registrateAdmin: RegistrateAdminDto,
  ): Promise<AdminsRegistrateType> {
    try {
      const user = await this.adminRepository.findOne({
        where: { login: registrateAdmin.login },
      });
      if (user) {
        throw new BadRequestException(messages.admins.USER_ALREADY_EXIST);
      }
      const newAdmin = await this.adminRepository.create({
        ...registrateAdmin,
      });
      const [accessToken, refreshToken] = await this.createTokens(
        newAdmin.id,
        newAdmin.login,
      );
      return {
        id: newAdmin.id,
        login: newAdmin.login,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async refresh(
    refreshTokensAdmin: RefreshTokensAdminDto,
  ): Promise<RefreshTokensType> {
    try {
      const decoded = this.jwtService.decode(refreshTokensAdmin.token);
      const [accessToken, refreshToken] = await this.createTokens(
        decoded['id'],
        decoded['login'],
      );
      return { accessToken, refreshToken };
    } catch (error) {
      checkErrorInstance(error);
    }
  }

  async createTokens(id: string, login: string) {
    return Promise.all([
      this.jwtService.signAsync(
        { id, login },
        { expiresIn: ACCESS_TOKEN_LIFETIME },
      ),
      this.jwtService.signAsync(
        { id, login },
        { expiresIn: REFRESH_TOKEN_LIFETIME },
      ),
    ]);
  }
}
