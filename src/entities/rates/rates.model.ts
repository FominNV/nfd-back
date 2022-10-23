import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { IRateType } from "entities/rateTypes/rate-types.types";
import { RateCreationAttrs } from "./rates.types";

@Table({ tableName: "rates" })
export class Rate extends Model<Rate, RateCreationAttrs> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
    price: number;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    rateTypeId: IRateType;
}
