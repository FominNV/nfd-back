import { IRateType } from "entities/rateTypes/rate-types.types";

export interface RateCreationAttrs {
  price: number;
  rateTypeId: IRateType;
}

export interface IRate extends RateCreationAttrs {
  id: number;
}
