import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Rate } from "./rates.model";
import { CreateRateDTO } from "./dto/create-rates.dto";
import { RateTypesService } from "entities/rateTypes/rate-types.service";
import { IResponse } from "common/types";
import { IRateType } from "entities/rateTypes/rate-types.types";

@Injectable()
export class RatesService {
  constructor (
    @InjectModel(Rate) private rateRepository: typeof Rate,
    private rateTypeService:RateTypesService,
  ) {}

  async createRate (dto: CreateRateDTO) {
    try {
      const res = await this.rateTypeService.getRateTypeById(dto.rateTypeId.id);
      const rateType = res.data as IRateType
      if (
        !rateType ||
        rateType.name !== dto.rateTypeId.name ||
        rateType.unit !== dto.rateTypeId.unit
      ) {
        throw new Error("Such type of rate doesn`t exists");
      }

      const uniqueRate = await this.rateRepository.findOne({
        where: { rateTypeId: dto.rateTypeId },
      });
      if (uniqueRate) {
        throw new Error("Such rate with current type of rate exists");
      }

      const rate = await this.rateRepository.create(dto);
      const response: IResponse = {
        count: 1,
        data: rate
      }
      return response;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllRates () {
    const rates = await this.rateRepository.findAll({
      include: { all: true },
    });
    const response: IResponse = {
      count: rates.length,
      data: rates,
    };
    return response;
  }

  async getRateById (id: number) {
    const rate = await this.rateRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: rate,
    };
    return response;
  }

  async updateRate (id: number, rateDto: CreateRateDTO) {
    const res = await this.rateTypeService.getRateTypeById(
      rateDto.rateTypeId.id,
    );
    const rateType = res.data as IRateType;
    if (
      !rateType ||
      rateType.name !== rateDto.rateTypeId.name ||
      rateType.unit !== rateDto.rateTypeId.unit
    ) {
      throw new Error("Such type of rate doesn`t exists");
    }

    const rate = await this.rateRepository.findOne({
      where: { id },
    });

    if (!rate) {
      throw new HttpException(
        "Rate with current ID doesn`t exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    rate.price = rateDto.price;
    rate.rateTypeId = rateDto.rateTypeId;
    await rate.save();
    const response: IResponse = {
      count: 1,
      data: rate,
    };
    return response;
  }

  async deleteRate (id: number) {
    const rate = await this.rateRepository.findOne({
      where: { id },
    });
    if (rate) {
      await rate.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "Rate with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
