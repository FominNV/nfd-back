export interface OrderStatusCreationAttrs {
  name: string;
}

export interface IOrderStatus extends OrderStatusCreationAttrs {
  id: number;
}

export enum OrderStatusType {
  NEW = "Неподтвержденный",
  CONFIRM = "Подтвержденный",
  CANCEL = "Отмененный",
  DONE = "Завершенный",
}