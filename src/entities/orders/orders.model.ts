import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ICar } from "entities/cars/cars.types";
import { ICity } from "entities/cities/cities.types";
import { IOrderStatus } from "entities/orderStatuses/order-statuses.types";
import { IPoint } from "entities/points/points.types";
import { IRate } from "entities/rates/rates.types";
import { OrderCreationAttrs } from "./orders.types";

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttrs> {
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
    type: DataType.JSON,
    allowNull: false,
  })
    orderStatusId: IOrderStatus;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    cityId: ICity;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    pointId: IPoint;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    carId: ICar;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    color: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    dateFrom: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    dateTo: Date;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    rateId: IRate;

  @ApiProperty()
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
    price: number;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    isFullTank: boolean;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    isNeedChildChair: boolean;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    isRightWheel: boolean;
}
