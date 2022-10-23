import { ApiProperty } from "@nestjs/swagger/dist";
import { Length } from "class-validator";

export class CreateCategoryDTO {
  @ApiProperty()
  @Length(3, 30, { message: "Length this field must be from 3 to 30 chars" })
  readonly name: string;

  @ApiProperty()
  @Length(5, 50, { message: "Length this field must be from 5 to 50 chars" })
  readonly description: string;
}
