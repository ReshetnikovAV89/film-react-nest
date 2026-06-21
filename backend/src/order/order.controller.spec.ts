import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    orderService = {
      createOrder: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;

    controller = new OrderController(orderService);
  });

  it('should create order through service', async () => {
    const order = [
      {
        film: '550e8400-e29b-41d4-a716-446655440000',
        session: '550e8400-e29b-41d4-a716-446655440001',
        daytime: '2025-06-20T10:00:00.000Z',
        row: 1,
        seat: 1,
        price: 350,
      },
    ] as CreateOrderDto[];

    const response = {
      total: 1,
      items: [],
    } as OrderResponseDto;

    orderService.createOrder.mockResolvedValue(response);

    await expect(controller.createOrder(order)).resolves.toBe(response);
    expect(orderService.createOrder).toHaveBeenCalledWith(order);
  });
});
