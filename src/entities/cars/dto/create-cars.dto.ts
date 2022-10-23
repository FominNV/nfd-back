import { ApiProperty } from "@nestjs/swagger/dist";
import { Length } from "class-validator";
import { ICategory } from "entities/categories/categories.types";
import { IThumbnail } from "../cars.types";

export class CreateCarDTO {
  @ApiProperty()
  @Length(3, 30, { message: "Length this field must be from 3 to 30 chars" })
  readonly name: string;

  @Length(8, 10, { message: "Length this field must be from 8 to 10 chars" })
  readonly number: string;

  @ApiProperty()
  @Length(5, 50, { message: "Length this field must be from 5 to 50 chars" })
  readonly description: string;

  @ApiProperty()
  readonly priceMin: number;

  @ApiProperty()
  readonly priceMax: number;

  @ApiProperty()
  readonly categoryId: ICategory;

  @ApiProperty()
  readonly thumbnail: IThumbnail;

  @ApiProperty()
  readonly colors: string[];
}
