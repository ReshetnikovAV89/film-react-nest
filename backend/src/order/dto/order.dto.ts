export class CreateOrderDto {
  film: string;
  session: string;
  daytime: string;
  day?: string;
  time?: string;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrderRequestDto {
  email: string;
  phone: string;
  tickets: CreateOrderDto[];
}

export class OrderItemDto extends CreateOrderDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderItemDto[];
}
