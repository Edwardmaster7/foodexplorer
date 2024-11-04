const knex = require('../database/knex');

class SearchRepository {
    async findDishesByName(query) {
        return await knex('Dishes')
            .whereLike('name', `%${query}%`)
            .orderBy('name');
    }

    async findIngredientsByName(query) {
        return await knex('Ingredients')
            .whereLike('name', `%${query}%`)
            .orderBy('name');
    }

    async findDishesByIngredientIds(ingredientIds) {
        return await knex('Dishes')
            .whereIn('id', function() {
                this.select('dish_id')
                    .from('DishIngredients')
                    .whereIn('ingredient_id', ingredientIds);
            })
            .orderBy('name');
    }
}

module.exports = SearchRepository; 