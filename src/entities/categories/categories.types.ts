export interface CategoryCreationAttrs {
  name: string;
  description: string;
}

export interface ICategory extends CategoryCreationAttrs {
  id: number;
}
