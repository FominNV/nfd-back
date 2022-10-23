import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CategoryCreationAttrs } from "./categories.types";

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationAttrs> {
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
    unique: true,
    allowNull: false,
  })
    name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    description: string;
}
