import { ApiProperty } from "@nestjs/swagger/dist";
import { Length } from "class-validator";

export class CreateOrderStatusDTO {
  @ApiProperty()
  @Length(2, 30, { message: "Length this field must be from 2 to 30 chars" })
  readonly name: string;
}
