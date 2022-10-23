import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderStatus } from "./order-statuses.model";
import { CreateOrderStatusDTO } from "./dto/create-order-statuses";
import { IResponse } from "common/types";

@Injectable()
export class OrderStatusesService {
  constructor (@InjectModel(OrderStatus) private orderStatusRepository: typeof OrderStatus) {}

  async createOrderStatus (dto: CreateOrderStatusDTO) {
    try {
      const orderStatus = await this.orderStatusRepository.create(dto);
      const response: IResponse = {
        count: 1,
        data: orderStatus
      }
      return response;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOrderStatuses () {
    const orderStatuses = await this.orderStatusRepository.findAll({
      include: { all: true },
    });
    const response: IResponse = {
      count: orderStatuses.length,
      data: orderStatuses,
    };
    return response;
  }

  async getOrderStatusById (id: number) {
    const orderStatus = await this.orderStatusRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: orderStatus,
    };
    return response;
  }

  async updateOrderStatus (id: number, orderStatusDto: CreateOrderStatusDTO) {
    const uniqueOrderStatus = await this.orderStatusRepository.findOne({
      where: { name: orderStatusDto.name },
    });
    if (uniqueOrderStatus) {
      throw new HttpException("Such orderStatus exists", HttpStatus.BAD_REQUEST);
    }

    const orderStatus = await this.orderStatusRepository.findOne({
      where: { id },
    });
    if (orderStatus) {
      orderStatus.name = orderStatusDto.name;
      await orderStatus.save();
      const response: IResponse = {
        count: 1,
        data: orderStatus,
      };
      return response;
    }

    throw new HttpException(
      "OrderStatus with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }

  async deleteOrderStatus (id: number) {
    const orderStatus = await this.orderStatusRepository.findOne({
      where: { id },
    });
    if (orderStatus) {
      await orderStatus.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "OrderStatus with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
