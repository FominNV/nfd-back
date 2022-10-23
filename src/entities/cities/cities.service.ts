import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { IResponse } from "common/types";
import { City } from "./cities.model";
import { CreateCityDTO } from "./dto/create-city.dto";

@Injectable()
export class CitiesService {
  constructor (
    @InjectModel(City) private cityRepository: typeof City,
  ) {}

  async createCity (dto: CreateCityDTO) {
    try {
      const uniqueCity = await this.cityRepository.findOne({ where: { name: dto.name } });
      if (uniqueCity) {
        throw new Error("City with such name exists");
      }

      const city = await this.cityRepository.create(dto);
      return city;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCities () {
    const cities = await this.cityRepository.findAll({
      include: { all: true },
    });
    const response: IResponse = {
      count: cities.length,
      data: cities
    } 

    return response;
  }

  async getCityById (id: number) {
    const city = await this.cityRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: city,
    }; 
    return response
  }

  async updateCity (id: number, cityDto: CreateCityDTO) {
    const uniqueCity = await this.cityRepository.findOne({
      where: { name: cityDto.name },
    });
    if (uniqueCity) {
      throw new HttpException("Such city exists", HttpStatus.BAD_REQUEST);
    }

    const city = await this.cityRepository.findOne({
      where: { id },
    });
    if (city) {
      city.name = cityDto.name;
      await city.save();
      const response: IResponse = {
        count: 1,
        data: city,
      };
      return response;
    }

    throw new HttpException(
      "City with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }

  async deleteCity (id: number) {
    const city = await this.cityRepository.findOne({
      where: { id },
    });
    if (city) {
      await city.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "City with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
