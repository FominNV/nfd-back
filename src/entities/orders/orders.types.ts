import { ICar } from "entities/cars/cars.types";
import { ICity } from "entities/cities/cities.types";
import { IOrderStatus } from "entities/orderStatuses/order-statuses.types";
import { IPoint } from "entities/points/points.types";
import { IRate } from "entities/rates/rates.types";

export interface OrderCreationAttrs {
  id: number | undefined
  orderStatusId: IOrderStatus | undefined;
  cityId: ICity;
  pointId: IPoint;
  carId: ICar;
  color: string;
  dateFrom: Date;
  dateTo: Date;
  rateId: IRate;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface IOrder extends OrderCreationAttrs {
  id: number;
}
