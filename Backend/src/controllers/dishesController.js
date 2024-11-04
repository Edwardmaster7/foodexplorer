const DishRepository = require('../repositories/DishRepository');
const DishesService = require('../services/DishesService');

class DishesController {
    async create(request, response) {
        const { name, description, price, category_id, ingredients_id } = request.body;

        const dishRepository = new DishRepository();
        const dishesService = new DishesService(dishRepository);

        const dish_id = await dishesService.createDish({ 
            name, 
            description, 
            price, 
            category_id, 
            ingredients_id 
        });

        return response.status(201).json({ id: dish_id });
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price, category_id, ingredients_id } = request.body;

        const dishRepository = new DishRepository();
        const dishesService = new DishesService(dishRepository);

        await dishesService.updateDish(id, { 
            name, 
            description, 
            price, 
            category_id, 
            ingredients_id 
        });

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        const dishRepository = new DishRepository();
        const dishesService = new DishesService(dishRepository);

        await dishesService.deleteDish(id);

        return response.json();
    }

    async index(request, response) {
        const dishRepository = new DishRepository();
        const dishesService = new DishesService(dishRepository);

        const dishes = await dishesService.listDishes();

        return response.json(dishes);
    }

    async show(request, response) {
        const { id } = request.params;

        const dishRepository = new DishRepository();
        const dishesService = new DishesService(dishRepository);

        const dish = await dishesService.getDish(id);

        return response.json(dish);
    }
}

module.exports = DishesController;
