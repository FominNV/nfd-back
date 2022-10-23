import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ICity } from "entities/cities/cities.types";
import { PointCreationAttrs } from "./points.types";

@Table({ tableName: "points" })
export class Point extends Model<Point, PointCreationAttrs> {
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
    name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    address: string;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    cityId: ICity;
}
