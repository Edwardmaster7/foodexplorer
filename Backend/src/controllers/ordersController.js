const OrdersRepository = require('../repositories/OrdersRepository');
const OrdersService = require('../services/OrdersService');

class OrdersController {
    async create(request, response) {
        const { dishes, total_price, payment_method } = request.body;
        const userId = request.user.id;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        await ordersService.createOrder({
            userId,
            dishes,
            totalPrice: total_price,
            paymentMethod: payment_method
        });

        return response.status(201).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { status } = request.body;
        const isAdmin = request.user.isAdmin;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const updatedOrder = await ordersService.updateOrderStatus({
            orderId: id,
            status,
            isAdmin
        });

        return response.status(200).json(updatedOrder);
    }

    async index(request, response) {
        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const orders = await ordersService.listOrders();
        return response.json(orders);
    }

    async show(request, response) {
        const { id } = request.params;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const order = await ordersService.getOrder(id);
        return response.json(order);
    }
}

module.exports = OrdersController;