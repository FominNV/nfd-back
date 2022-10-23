import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { OrderStatusCreationAttrs } from "./order-statuses.types";

@Table({ tableName: "order_statuses" })
export class OrderStatus extends Model<OrderStatus, OrderStatusCreationAttrs> {
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
