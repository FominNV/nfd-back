import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { RateTypeCreationAttrs } from "./rate-types.types";

@Table({ tableName: "rate_types" })
export class RateType extends Model<RateType, RateTypeCreationAttrs> {
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
    unit: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    name: string;
}
