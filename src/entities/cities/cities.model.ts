import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CityCreationAttrs } from "./cities.types";

@Table({ tableName: "cities" })
export class City extends Model<City, CityCreationAttrs> {
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
}
