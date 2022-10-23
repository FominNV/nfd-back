import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Car } from "./cars.model";
import { CreateCarDTO } from "./dto/create-cars.dto";
import { CategoriesService } from "entities/categories/categories.service";
import { IQueryParams, IResponse } from "common/types";
import { ICategory } from "entities/categories/categories.types";

@Injectable()
export class CarsService {
  constructor (
    @InjectModel(Car) private carRepository: typeof Car,
    private categoryService: CategoriesService,
  ) {}

  async createCar (dto: CreateCarDTO) {
    try {
      const res = await this.categoryService.getCategoryById(dto.categoryId.id);
      console.log("res category", res);
      const category = res.data as ICategory
      if (!category) {
        throw new Error("Such category doesn`t exists");
      }

      const uniqueCar = await this.carRepository.findOne({
        where: { name: dto.name },
      });
      if (uniqueCar) {
        throw new Error("Such car exists");
      }

      const car = await this.carRepository.create(dto);
      const response: IResponse = {
        count: 1,
        data: car
      }
      return response;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCars (params: IQueryParams | undefined) {
    const { categoryId, limit = 100, page = 1 } = params;

    let cars = await this.carRepository.findAll({
      include: { all: true },
    });
    const from = Number(page) === 1 ? 1 : 1 + Number(page) * Number(limit);
    const to = Number(limit) * Number(page);

    if (categoryId) {
      cars = cars.filter((elem) => elem.categoryId.id === Number(categoryId));
    }

    const limitCars = [];
    cars.forEach((elem, i) => {
      if (i + 1 >= from && i + 1 <= to) {
        limitCars.push(elem);
      }
    });

    const response: IResponse = {
      count: cars.length,
      data: limitCars,
    };
    return response;
  }

  async getCarById (id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: car,
    };
    return response
  }

  async updateCar (id: number, carDto: CreateCarDTO) {
    const res = await this.categoryService.getCategoryById(
      carDto.categoryId.id,
    );
    const category = res.data as ICategory;
    if (
      !category ||
      category.name !== carDto.categoryId.name ||
      category.description !== carDto.categoryId.description
    ) {
      throw new HttpException(
        "Such category doesn`t exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    const car = await this.carRepository.findOne({
      where: { id },
    });
    if (car) {
      car.name = carDto.name;
      car.description = carDto.description;
      car.priceMin = carDto.priceMin;
      car.priceMax = carDto.priceMax;
      car.categoryId = carDto.categoryId;
      car.colors = carDto.colors;
      car.thumbnail = carDto.thumbnail;
      await car.save();
      const response: IResponse = {
        count: 1,
        data: car,
      };
      return response;
    }

    throw new HttpException(
      "Car with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }

  async deleteCar (id: number) {
    const car = await this.carRepository.findOne({
      where: { id },
    });
    if (car) {
      await car.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "Car with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
