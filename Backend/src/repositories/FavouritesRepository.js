const knex = require('../database/knex');

class FavouritesRepository {
    async findDishById(dish_id) {
        return await knex('Dishes').where({ id: dish_id }).first();
    }

    async findFavourite(user_id, dish_id) {
        return await knex('Favourites').where({ user_id, dish_id }).first();
    }

    async insertFavourite(user_id, dish_id) {
        return await knex('Favourites').insert({ user_id, dish_id });
    }

    async deleteFavourite(user_id, dish_id) {
        return await knex('Favourites').where({ user_id, dish_id }).delete();
    }

    async findAllFavourites() {
        return await knex('Favourites')
            .join('Dishes', 'Favourites.dish_id', '=', 'Dishes.id')
            .join('Categories', 'Dishes.category_id', '=', 'Categories.id')
            .groupBy('Dishes.category_id', 'Dishes.name', 'Categories.name')
            .select('Categories.name as category', 'Dishes.id', 'Dishes.name', 'Dishes.image', knex.raw('COUNT(*) as favouriteCount'))
            .orderBy('category');
    }

    async findUserFavourites(user_id) {
        return await knex('Favourites')
            .where({ user_id })
            .join('Dishes', 'Favourites.dish_id', '=', 'Dishes.id')
            .leftJoin('Categories', 'Dishes.category_id', '=', 'Categories.id')
            .select('Dishes.*', 'Categories.name as category');
    }
}

module.exports = FavouritesRepository; 