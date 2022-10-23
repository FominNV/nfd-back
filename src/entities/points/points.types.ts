import { ICity } from "../cities/cities.types";

export interface PointCreationAttrs {
  name: string;
  address: string;
  cityId: ICity;
}

export interface IPoint extends PointCreationAttrs {
  id: number
}
