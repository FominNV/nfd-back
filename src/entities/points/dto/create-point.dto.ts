import { ApiProperty } from "@nestjs/swagger/dist";
import { Length } from "class-validator";
import { ICity } from "entities/cities/cities.types";

export class CreatePointDTO {
  @ApiProperty()
  @Length(2, 30, { message: "Length this field must be from 2 to 30 chars" })
  readonly name: string;

  @ApiProperty()
  @Length(2, 30, { message: "Length this field must be from 2 to 30 chars" })
  readonly address: string;

  @ApiProperty()
    cityId: ICity;
}
