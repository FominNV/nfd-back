import { ApiProperty } from "@nestjs/swagger/dist";
import { Length } from "class-validator";

export class CreateRateTypeDTO {
  @ApiProperty()
  @Length(2, 30, { message: "Length this field must be from 1 to 30 chars" })
  readonly unit: string;

  @ApiProperty()
  @Length(1, 30, { message: "Length this field must be from 2 to 30 chars" })
  readonly name: string;
}
