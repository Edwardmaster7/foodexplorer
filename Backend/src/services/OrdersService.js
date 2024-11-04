const AppError = require('../utils/AppError');

class OrdersService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    async createOrder({ userId, dishes, totalPrice, paymentMethod }) {
        if (totalPrice < 0) {
            throw new AppError('Total price must be a positive decimal number');
        }

        const quantities = dishes.map(dish => dish.qty);
        if (quantities.some(qty => qty <= 0)) {
            throw new AppError('All quantities must be greater than zero');
        }

        if (!paymentMethod) {
            throw new AppError('Payment method is required');
        }
        
        const validPaymentMethods = ['credit_card', 'pix', 'cash'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            throw new AppError('Invalid payment method');
        }

        const dishesId = dishes.map(dish => dish.id);
        if (!Array.isArray(dishesId)) {
            throw new AppError('Dishes must be an array of integers');
        }

        const existingDishes = await this.ordersRepository.findDishesById(dishesId);
        if (existingDishes.length !== dishesId.length) {
            throw new AppError('One or more dishes not found');
        }

        const orderId = await this.ordersRepository.createOrder({ 
            userId, 
            totalPrice, 
            paymentMethod 
        });

        const orderDishes = dishesId.map((dishId, index) => ({
            order_id: orderId,
            dish_id: dishId,
            quantity: quantities[index]
        }));

        await this.ordersRepository.createOrderDishes(orderDishes);

        return orderId;
    }

    async updateOrderStatus({ orderId, status, isAdmin }) {
        const order = await this.ordersRepository.findOrderById(orderId);
        
        if (!order) {
            throw new AppError('Order not found');
        }

        if (!isAdmin) {
            throw new AppError('You are not authorized to update this order');
        }

        const validStatuses = ['pending', 'preparing', 'delivered', 'canceled'];
        if (!validStatuses.includes(status)) {
            throw new AppError('Invalid status');
        }

        const updatedOrder = await this.ordersRepository.updateOrder(orderId, status);
        return updatedOrder[0];
    }

    async listOrders() {
        const orders = await this.ordersRepository.getAllOrders();
        
        return orders.reduce((accumulator, order) => {
            const existingOrder = accumulator.find(o => o.id === order.id);
            if (existingOrder) {
                existingOrder.dishes.push({
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity
                });
            } else {
                accumulator.push({
                    ...order,
                    dishes: [{
                        name: order.name,
                        price: order.price,
                        quantity: order.quantity
                    }]
                });
            }
            return accumulator;
        }, []);
    }

    async getOrder(id) {
        const order = await this.ordersRepository.findOrderById(id);
        
        if (!order) {
            throw new AppError('Order not found');
        }

        const dishes = await this.ordersRepository.getOrderDishes(id);
        return { ...order, dishes };
    }
}

module.exports = OrdersService; 