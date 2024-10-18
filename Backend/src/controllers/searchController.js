const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class SearchController {
    async search(request, response) {
        const { query } = request.params;

        if (!query) {
            throw new AppError('Search query must be provided');
        }

        // Search for dishes by name
        let dishesByName = await knex('Dishes')
            .whereLike('name', `%${query}%`)
            .orderBy('name');

        // Search for ingredients
        const ingredients = await knex('Ingredients')
            .whereLike('name', `%${query}%`)
            .orderBy('name');
        
        // Search for dishes by ingredients
        let dishesByIngredients = [];
        if (ingredients.length > 0) {
            const ingredientIds = ingredients.map(ingredient => ingredient.id);
            dishesByIngredients = await knex('Dishes')
                .whereIn('id', function() {
                    this.select('dish_id')
                        .from('DishIngredients')
                        .whereIn('ingredient_id', ingredientIds);
                })
                .orderBy('name');
        }

        // Combine and deduplicate results
        const allDishes = [...dishesByName, ...dishesByIngredients];
        const uniqueDishes = Array.from(new Set(allDishes.map(dish => dish.id)))
            .map(id => allDishes.find(dish => dish.id === id));

        return response.json({ dishes: uniqueDishes });
    }
}

module.exports = SearchController;
