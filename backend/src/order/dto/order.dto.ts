export class CreateOrderDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderItemDto extends CreateOrderDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderItemDto[];
}
