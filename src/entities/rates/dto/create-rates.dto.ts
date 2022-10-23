import { ApiProperty } from "@nestjs/swagger/dist";
import { IRateType } from "entities/rateTypes/rate-types.types";

export class CreateRateDTO {
  @ApiProperty()
  readonly price: number;

  @ApiProperty()
    rateTypeId: IRateType;
}
