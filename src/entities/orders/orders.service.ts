import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./orders.model";
import { CreateOrderDTO } from "./dto/create-orders.dto";
import { OrderStatusesService } from "entities/orderStatuses/order-statuses.service";
import { OrderCreationAttrs } from "./orders.types";
import { CitiesService } from "entities/cities/cities.service";
import { PointsService } from "entities/points/points.service";
import { CarsService } from "entities/cars/cars.service";
import { RatesService } from "entities/rates/rates.service";
import { IQueryParams } from "common/types";
import { IResponse } from "common/types";
import { IOrderStatus } from "entities/orderStatuses/order-statuses.types";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderRepository: typeof Order,
    private cityService: CitiesService,
    private pointService: PointsService,
    private carService: CarsService,
    private rateService: RatesService,
    private orderStatusService: OrderStatusesService
  ) {}

  async createOrder(dto: OrderCreationAttrs, params: IQueryParams) {
    try {
      const responseCity = await this.cityService.getCityById(dto.cityId.id);
      const city = responseCity.data
      if (!city) {
        throw new Error("Such city doesn`t exists");
      }

      const responsePoint = await this.pointService.getPointById(dto.pointId.id);
      const point = responsePoint.data
      if (!point) {
        throw new Error("Such point doesn`t exists");
      }

      const responseCar = await this.carService.getCarById(dto.carId.id);
      const car = responseCar.data
      if (!car) {
        throw new Error("Such car doesn`t exists");
      }

      const responseRate = await this.rateService.getRateById(dto.rateId.id);
      const rate = responseRate.data
      if (!rate) {
        throw new Error("Such rate doesn`t exists");
      }

      if (params.statusId) {
        const responseOrderStatus = await this.orderStatusService.getOrderStatusById(
          Number(params.statusId)
        );
        const orderStatus = responseOrderStatus.data as IOrderStatus
        if (orderStatus) {
          const changedOrder = await this.orderRepository.findOne({
            where: { id: dto.id },
          });
          changedOrder.orderStatusId = orderStatus;
          changedOrder.save();
          const response: IResponse = {
            count: 1,
            data: changedOrder,
          };
          return response;

        } else {
          throw new Error("Invalid status id")
        }
      }

      const responseOrderStatus = await this.orderStatusService.getOrderStatusById(1);
      const orderStatus = responseOrderStatus.data as IOrderStatus;
      dto.orderStatusId = orderStatus;
      const order = await this.orderRepository.create(dto);
      const response: IResponse = {
        count: 1,
        data: order,
      };
      return response;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOrders(params: IQueryParams) {
    const { cityId, rateId, statusId, limit = 100, page = 1 } = params;

    let orders = await this.orderRepository.findAll({
      include: { all: true },
    });

      if (cityId) {
        orders = orders.filter((elem) => elem.cityId.id === Number(cityId));
      }
      if (rateId) {
        orders = orders.filter((elem) => elem.rateId.id === Number(rateId));
      }
      if (statusId) {
        orders = orders.filter(
          (elem) => elem.orderStatusId.id === Number(statusId),
        );
      }

    const from = Number(page) === 1 ? 1 : 1 + (Number(page) - 1) * Number(limit);
    const to = Number(limit) * Number(page);

    const limitOrders = [];
    orders.forEach((elem, i) => {
      if (i + 1 >= from && i + 1 <= to) {
        limitOrders.push(elem);
      }
    });

    const response: IResponse = {
      count: orders.length,
      data: limitOrders,
    };
    return response;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: order,
    };
    return response;
  }

  async updateOrder(id: number, dto: CreateOrderDTO) {
    try {
      const orderStatus = await this.orderStatusService.getOrderStatusById(
        dto.orderStatusId.id
      );
      if (!orderStatus) {
        throw new Error("Such orderStatus doesn`t exists");
      }

      const city = await this.cityService.getCityById(dto.cityId.id);
      if (!city) {
        throw new Error("Such city doesn`t exists");
      }

      const point = await this.pointService.getPointById(dto.pointId.id);
      if (!point) {
        throw new Error("Such point doesn`t exists");
      }

      const car = await this.carService.getCarById(dto.carId.id);
      if (!car) {
        throw new Error("Such car doesn`t exists");
      }

      const rate = await this.rateService.getRateById(dto.rateId.id);
      if (!rate) {
        throw new Error("Such rate doesn`t exists");
      }

      const order = await this.orderRepository.findOne({
        where: { id },
      });
      if (order) {
        order.orderStatusId = dto.orderStatusId;
        order.cityId = dto.cityId;
        order.pointId = dto.pointId;
        order.carId = dto.carId;
        order.color = dto.color;
        order.dateFrom = dto.dateFrom;
        order.dateTo = dto.dateTo;
        order.rateId = dto.rateId;
        order.price = dto.price;
        order.isFullTank = dto.isFullTank;
        order.isNeedChildChair = dto.isNeedChildChair;
        order.isRightWheel = dto.isRightWheel;
        await order.save();
        const response: IResponse = {
          count: 1,
          data: order,
        };
        return response;
      }

      throw new Error("Order with current ID doesn`t exists");
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (order) {
      await order.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "Order with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST
    );
  }
}
