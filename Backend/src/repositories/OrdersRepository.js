const knex = require('../database/knex');

class OrdersRepository {
    async findDishesById(dishIds) {
        return await knex('Dishes').whereIn('id', dishIds).select('id');
    }

    async createOrder({ userId, totalPrice, paymentMethod }) {
        const [orderId] = await knex('Orders').insert({
            user_id: userId,
            total_price: totalPrice,
            payment_method: paymentMethod
        });
        return orderId;
    }

    async createOrderDishes(orderDishes) {
        return await knex('OrderDishes').insert(orderDishes);
    }

    async findOrderById(id) {
        return await knex('Orders').where('id', id).first();
    }

    async updateOrder(id, status) {
        return await knex('Orders')
            .where('id', id)
            .update({ status })
            .returning('*');
    }

    async getAllOrders() {
        return await knex('OrderDishes')
            .join('Dishes', 'OrderDishes.dish_id', '=', 'Dishes.id')
            .join('Orders', 'OrderDishes.order_id', '=', 'Orders.id')
            .select('Orders.*', 'Dishes.name', 'Dishes.price', 'OrderDishes.quantity')
            .groupBy('Orders.id', 'Dishes.id');
    }

    async getOrderDishes(orderId) {
        return await knex('OrderDishes')
            .join('Dishes', 'OrderDishes.dish_id', '=', 'Dishes.id')
            .where('OrderDishes.order_id', orderId)
            .select('Dishes.name', 'Dishes.price', 'OrderDishes.quantity');
    }
}

module.exports = OrdersRepository; 