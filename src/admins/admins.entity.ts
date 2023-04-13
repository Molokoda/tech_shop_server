import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Admins extends Model {
  @Column
  login: string;

  @Column
  password: string;
}
