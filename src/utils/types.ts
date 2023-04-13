export type AdminsLoginType = {
  id: string;
  login: string;
  accessToken: string;
  refreshToken: string;
};

export type AdminsRegistrateType = {
  id: string;
  login: string;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokensType = {
  accessToken: string;
  refreshToken: string;
};
