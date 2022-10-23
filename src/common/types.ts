import { ICar } from "entities/cars/cars.types";
import { ICategory } from "entities/categories/categories.types";
import { ICity } from "entities/cities/cities.types";
import { IOrder } from "entities/orders/orders.types";
import { IOrderStatus } from "entities/orderStatuses/order-statuses.types";
import { IPoint } from "entities/points/points.types";
import { IRate } from "entities/rates/rates.types";
import { IRateType } from "entities/rateTypes/rate-types.types";

export interface IQueryParams {
  categoryId: string;
  cityId: string;
  statusId: string;
  rateId: string;
  limit: string;
  page: string;
}

export interface IResponse {
  count: number;
  data:
    | {token: string}
    | ICity[]
    | ICity
    | ICategory[]
    | ICategory
    | ICar[]
    | ICar
    | IPoint[]
    | IPoint
    | IOrder[]
    | IOrder
    | IOrderStatus[]
    | IOrderStatus
    | IRate[]
    | IRate
    | IRateType[]
    | IRateType
}