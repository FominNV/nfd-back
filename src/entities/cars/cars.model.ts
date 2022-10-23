import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ICategory } from "entities/categories/categories.types";
import { CarCreationAttrs, IThumbnail } from "./cars.types";

@Table({ tableName: "cars" })
export class Car extends Model<Car, CarCreationAttrs> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
    id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    number: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    description: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    priceMin: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    priceMax: number;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    categoryId: ICategory;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    colors: string[];

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    thumbnail: IThumbnail;
}
