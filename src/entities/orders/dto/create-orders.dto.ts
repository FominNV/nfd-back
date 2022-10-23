import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString, Length } from "class-validator";
import { ICar } from "entities/cars/cars.types";
import { ICity } from "entities/cities/cities.types";
import { IOrderStatus } from "entities/orderStatuses/order-statuses.types";
import { IPoint } from "entities/points/points.types";
import { IRate } from "entities/rates/rates.types";

export class CreateOrderDTO {
  @ApiProperty()
    orderStatusId: IOrderStatus | undefined;

  @ApiProperty()
    cityId: ICity;

  @ApiProperty()
    pointId: IPoint;

  @ApiProperty()
    carId: ICar;

  @ApiProperty()
  @IsString()
  @Length(2, 30, { message: "Color`s length must be from 2 to 30 chars" })
    color: string;

  @ApiProperty()
    dateFrom: Date;

  @ApiProperty()
    dateTo: Date;

  @ApiProperty()
    rateId: IRate;

  @ApiProperty()
    price: number;

  @ApiProperty()
    isFullTank: boolean;

  @ApiProperty()
    isNeedChildChair: boolean;

  @ApiProperty()
    isRightWheel: boolean;
}
