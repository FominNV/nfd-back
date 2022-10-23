import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { IResponse } from "common/types";
import { Category } from "./categories.model";
import { CreateCategoryDTO } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor (
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async createCategory (dto: CreateCategoryDTO) {
    const uniqueCategory = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (uniqueCategory) {
      throw new HttpException(
        "Such category exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.categoryRepository.create(dto);
    const response: IResponse = {
      count: 1,
      data: category,
    };
    return response;
  }

  async getAllCategories () {
    const categories = await this.categoryRepository.findAll({
      include: { all: true },
    });
    const response: IResponse = {
      count: categories.length,
      data: categories,
    };
    return response;
  }

  async getCategoryById (id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    const response: IResponse = {
      count: 1,
      data: category,
    };
    return response;
  }

  async updateCategory (id: number, categoryDto: CreateCategoryDTO) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (category) {
      category.name = categoryDto.name;
      category.description = categoryDto.description;
      await category.save();
      const response: IResponse = {
        count: 1,
        data: category,
      };
      return response;
    }

    throw new HttpException(
      "Category with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }

  async deleteCategory (id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (category) {
      await category.destroy();
      const response: IResponse = {
        count: 0,
        data: [],
      };
      return response;
    }

    throw new HttpException(
      "Category with current ID doesn`t exists",
      HttpStatus.BAD_REQUEST,
    );
  }
}
