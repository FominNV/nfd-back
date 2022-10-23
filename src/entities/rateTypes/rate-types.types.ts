export interface RateTypeCreationAttrs {
  unit: string;
  name: string;
}

export interface IRateType extends RateTypeCreationAttrs {
  id: number
}
