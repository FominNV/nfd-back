import { ICategory } from "../categories/categories.types";

export interface CarCreationAttrs {
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  categoryId: ICategory;
  thumbnail: IThumbnail;
}

export interface ICar extends CarCreationAttrs {
  id: number;
}

export interface IThumbnail {
  mimetype: string;
  originalname: string;
  size: number;
  path: string;
}
