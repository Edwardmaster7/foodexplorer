const OrdersService = require('./OrdersService');
const AppError = require('../utils/AppError');

describe('OrdersService', () => {
    let ordersService;
    let ordersRepositoryMock;

    beforeEach(() => {
        ordersRepositoryMock = {
            findDishesById: jest.fn(),
            createOrder: jest.fn(),
            createOrderDishes: jest.fn(),
            findOrderById: jest.fn(),
            updateOrder: jest.fn(),
            getAllOrders: jest.fn(),
            getOrderDishes: jest.fn()
        };

        ordersService = new OrdersService(ordersRepositoryMock);
    });

    describe('createOrder', () => {
        const validOrderData = {
            userId: 1,
            dishes: [{ id: 1, qty: 2 }],
            totalPrice: 29.99,
            paymentMethod: 'credit_card'
        };

        it('should create order successfully', async () => {
            ordersRepositoryMock.findDishesById.mockResolvedValue([{ id: 1 }]);
            ordersRepositoryMock.createOrder.mockResolvedValue(1);

            await ordersService.createOrder(validOrderData);

            expect(ordersRepositoryMock.createOrder).toHaveBeenCalled();
            expect(ordersRepositoryMock.createOrderDishes).toHaveBeenCalled();
        });

        it('should throw error when total price is negative', async () => {
            const invalidData = { ...validOrderData, totalPrice: -10 };

            await expect(ordersService.createOrder(invalidData))
                .rejects
                .toEqual(new AppError('Total price must be a positive decimal number'));
        });

        it('should throw error when quantity is zero or negative', async () => {
            const invalidData = {
                ...validOrderData,
                dishes: [{ id: 1, qty: 0 }]
            };

            await expect(ordersService.createOrder(invalidData))
                .rejects
                .toEqual(new AppError('All quantities must be greater than zero'));
        });

        it('should throw error when payment method is invalid', async () => {
            const invalidData = {
                ...validOrderData,
                paymentMethod: 'invalid'
            };

            await expect(ordersService.createOrder(invalidData))
                .rejects
                .toEqual(new AppError('Invalid payment method'));
        });
    });

    describe('updateOrderStatus', () => {
        const validUpdateData = {
            orderId: 1,
            status: 'preparing',
            isAdmin: true
        };

        it('should update order status successfully', async () => {
            ordersRepositoryMock.findOrderById.mockResolvedValue({ id: 1 });
            ordersRepositoryMock.updateOrder.mockResolvedValue([{ id: 1, status: 'preparing' }]);

            const result = await ordersService.updateOrderStatus(validUpdateData);

            expect(result).toEqual({ id: 1, status: 'preparing' });
        });

        it('should throw error when order not found', async () => {
            ordersRepositoryMock.findOrderById.mockResolvedValue(null);

            await expect(ordersService.updateOrderStatus(validUpdateData))
                .rejects
                .toEqual(new AppError('Order not found'));
        });

        it('should throw error when user is not admin', async () => {
            const invalidData = { ...validUpdateData, isAdmin: false };

            ordersRepositoryMock.findOrderById.mockResolvedValue({ id: 1 });

            await expect(ordersService.updateOrderStatus(invalidData))
                .rejects
                .toEqual(new AppError('You are not authorized to update this order'));
        });
    });
}); 