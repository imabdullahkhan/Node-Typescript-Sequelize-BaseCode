import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DeletedAt, DataType, AllowNull, PrimaryKey, Unique, Default, ForeignKey, BelongsTo, HasOne, AutoIncrement } from 'sequelize-typescript'
import { ENUM } from 'sequelize/types';
import { UserStatus } from '../../Constrants/enums';
import { UserInterface } from './UserInterface';

@Table({ timestamps: true, tableName: "User", modelName: "User" })
export default class UserModel extends Model<UserModel> implements UserInterface {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  Id: number
  @Column(DataType.INTEGER)
  Pincode : number
  @Column(DataType.BIGINT)
  ExpiryPincode: number;
  @Column(DataType.TINYINT)
  SystemGeneratedPassword: number;
  @Unique
  @Column(DataType.STRING)
  Email: string;
  @Column(DataType.STRING)
  Password: string;
  @Column(DataType.TINYINT)
  UserStatus: number;
  @Column(DataType.TINYINT)
  UserType: number;
  @Column(DataType.STRING)
  Name: string;
  @Column(DataType.STRING)
  ProfileImage: string;
}