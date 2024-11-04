const knex = require('../database/knex');

class DishRepository {
    async findDishById(id) {
        return await knex('Dishes').where('id', id).first();
    }

    async findCategoryById(category_id) {
        return await knex("Categories").where({ id: category_id }).first();
    }

    async findIngredientsByIds(ingredients_id) {
        return await knex("Ingredients")
            .whereIn("id", ingredients_id)
            .select("id");
    }

    async findDishByName(name) {
        return await knex("Dishes").where({ name }).first();
    }

    async insertDish({ name, description, price, category_id }) {
        return await knex("Dishes").insert({
            name,
            description,
            price,
            category_id
        });
    }

    async insertDishIngredients(dish_ingredients) {
        return await knex("DishIngredients").insert(dish_ingredients);
    }

    async findDishIngredientsByDishId(dish_id) {
        return await knex("DishIngredients").where({ dish_id });
    }

    async deleteDishById(id) {
        return await knex("Dishes").where({ id }).delete();
    }

    async updateDish(id, { name, description, price, category_id }) {
        return await knex("Dishes").where({ id }).update({
            name,
            description,
            price,
            category_id
        });
    }

    async updateDishImage(id, image) {
        return await knex('Dishes').where('id', id).update({ image }).returning('*');
    }

    async deleteDishIngredients(dish_id) {
        return await knex("DishIngredients").where({ dish_id }).delete();
    }

    async findAllDishes() {
        return await knex("Dishes")
            .join("Categories", "Categories.id", "=", "Dishes.category_id")
            .leftJoin("DishIngredients", "DishIngredients.dish_id", "=", "Dishes.id")
            .leftJoin("Ingredients", "Ingredients.id", "=", "DishIngredients.ingredient_id")
            .select(
                "Dishes.*",
                "Categories.name as category_name",
                knex.raw(`GROUP_CONCAT(distinct Ingredients.name) as ingredients`)
            )
            .groupBy("Dishes.id", "Categories.name");
    }

    async findDishWithDetails(id) {
        return await knex("Dishes")
            .where({ dish_id: id })
            .join("Categories", "Categories.id", "=", "Dishes.category_id")
            .leftJoin("DishIngredients", "DishIngredients.dish_id", "=", "Dishes.id")
            .leftJoin("Ingredients", "Ingredients.id", "=", "DishIngredients.ingredient_id")
            .select(
                "Dishes.*",
                "Categories.name as category_name",
                knex.raw(`GROUP_CONCAT(distinct Ingredients.name) as ingredients`)
            )
            .first();
    }
}

module.exports = DishRepository; 