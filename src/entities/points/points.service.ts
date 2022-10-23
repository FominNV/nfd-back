import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Point } from "./points.model";
import { CreatePointDTO } from "./dto/create-point.dto";
import { CitiesService } from "../cities/cities.service";
import { ICity } from "entities/cities/cities.types";
import { IResponse } from "common/types";

@Injectable()
export class PointsService {
  constructor (
    @InjectModel(Point) private pointRepository: typeof Point,
    private cityService: CitiesService,
  ) {}

  async createPoint (dto: CreatePointDTO) {
    try {
      const res = await this.cityService.getCityById(dto.cityId.id);
      const city = res.data as ICity
      if (!city || city.name !== dto.cityId.name) {
        throw new Error("Such city doesn`t exists");
      }

      const uniquePoint = await this.pointRepository.findOne({ where: { name: dto.name, address: dto.address, cityId: dto.cityId } });
      if (uniquePoint) {
        throw new Error("Such point exists");
      }

      const point = await this.pointRepository.create(dto);
      const response: IResponse = {
        count: 1,
        data: point,
      };
      return response;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllPoints () {
    const points = await this.pointRepository.findAll({
      include: { all: true },
    });
    const response: IResponse = {
      count: points.length,
      data: points,
    };
    return response;
  }

  async getPointById (id: number) {
    const point = await this.pointRepository.findOne({ where: { id } });
    if (!point) {
      throw new HttpException("Such point doesn`t exists", HttpStatus.BAD_REQUEST);
    }
    const response: IResponse = {
      count: 1,
      data: point,
    };
    return response;
  }

  async updatePoint (id: number, pointDto: CreatePointDTO) {
    const res = await this.cityService.getCityById(pointDto.cityId.id);
    const city = res.data as ICity;
    if (!city || city.name !== pointDto.cityId.name) {
      throw new Error("Such city doesn`t exists");
    }

    const uniquePoint = await this.pointRepository.findOne({
      where: { name: pointDto.name, address: pointDto.address, cityId: pointDto.cityId },
    });
    if (uniquePoint) {
      throw new HttpException("Such point exists", HttpStatus.BAD_REQUEST);
    }

    const point = await this.pointRepository.findOne({
      where: { id },
    });
    if (point) {
      point.name = pointDto.name;
      point.address = pointDto.address;
      point.cityId = pointDto.cityId;
      await point.save();
      const response: IResponse = {
        count: 1,
        data: point,
      };
      return response;
    }

    throw new HttpException(
      "Point with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }

  async deletePoint (id: number) {
    const point = await this.pointRepository.findOne({
      where: { id },
    });
    if (point) {
      await point.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "Point with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
