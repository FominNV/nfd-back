import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RateType } from "./rate-types.model";
import { CreateRateTypeDTO } from "./dto/create-rate-types.dto";
import { IResponse } from "common/types";

@Injectable()
export class RateTypesService {
  constructor (
    @InjectModel(RateType) private rateTypeRepository: typeof RateType,
  ) {}

  async createRateType (dto: CreateRateTypeDTO) {
    try {
      const uniqueRateType = await this.rateTypeRepository.findOne({
        where: { name: dto.name },
      });
      if (uniqueRateType) {
        throw new Error("Such type of rate exists");
      }

      const rateType = await this.rateTypeRepository.create(dto);
      const response: IResponse = {
        count: 1,
        data: rateType
      }
      return response;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllRateTypes () {
    const rateTypes = await this.rateTypeRepository.findAll({
      include: { all: true },
    });
    const response: IResponse = {
      count: rateTypes.length,
      data: rateTypes,
    };
    return response;
  }

  async getRateTypeById (id: number) {
    const rateType = await this.rateTypeRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: rateType,
    };
    return response;
  }

  async updateRateType (id: number, rateTypeDto: CreateRateTypeDTO) {
    const rateType = await this.rateTypeRepository.findOne({
      where: { id },
    });

    if (!rateType) {
      throw new HttpException(
        "Type of rate with current ID doesn`t exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (rateType.name !== rateTypeDto.name) {
      const uniqueRateType = await this.rateTypeRepository.findOne({
        where: { name: rateTypeDto.name },
      });
      if (uniqueRateType) {
        throw new HttpException(
          "Such type of rate exists",
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    rateType.name = rateTypeDto.name;
    rateType.unit = rateTypeDto.unit;
    await rateType.save();
    const response: IResponse = {
      count: 1,
      data: rateType,
    };
    return response;
  }

  async deleteRateType (id: number) {
    const rateType = await this.rateTypeRepository.findOne({
      where: { id },
    });
    if (rateType) {
      await rateType.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "RateType with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
