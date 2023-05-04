import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Products extends Model {
  @Column
  name: string;

  @Column
  price: number;

  @Column
  description: string;

  @Column
  filename: string;
}
