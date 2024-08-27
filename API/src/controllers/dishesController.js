const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class DishesController {

    async create(request, response) {
        const { name, description, price, category_id, ingredients_id } = request.body;

        // validate fields
        if (!name || !description || !price  || !category_id || ingredients_id.lenght < 0) {
            throw new AppError('All fields must be provided');
        }

        if (price < 0) {
            throw new AppError('Price must be a positive decimal number');
        }

        // check if category exists
        const category = await knex('Categories').where({ id: category_id }).first();
        if (!category) {
            throw new AppError('Category not found');
        }

        // check if ingredients exists
        const ingredients = await knex('Ingredients').whereIn('id', ingredients_id).select('id');
        if (ingredients.length !== ingredients_id.length) {
            throw new AppError('One or more ingredients not found');
        }

        // check if dish already exists
        const checkDishExists = await knex('Dishes').where({ name }).first();
        if (checkDishExists) {
            throw new AppError('Dish already exists');
        }

        const [ dish_id ] = await knex('Dishes').insert({
            name,
            description,
            price,
            category_id,
        });

        console.log(dish_id);

        // insert dish_ingredients relation
        const dish_ingredients = ingredients_id.map(ingredient_id => ({ dish_id, ingredient_id }));
        console.log(dish_ingredients);
        await knex('DishIngredients').insert(dish_ingredients);

        // check if relation was inserted successfully
        const checkRelation = await knex('DishIngredients').where({ dish_id }).select('id');
        if (checkRelation.length === 0) {
            await knex('Dishes').where({ id: dish_id }).delete();
            throw new AppError('Error inserting dish_ingredients relation. Dish not created.');
        }

        return response.status(201).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price, category_id, ingredients_id } = request.body;

        // validate fields
        if (!name &&!description &&!price &&!category_id &&!ingredients_id) {
            throw new AppError('At least one field must be provided');
        }

        if (price && price < 0) {
            throw new AppError('Price must be a positive decimal number');
        }

        // check if category exists
        if(category_id) {
            const category = await knex('Categories').where({ id: category_id }).first();
            if (!category) {
                throw new AppError('Category not found');
            }
        }

        // check if ingredients array is not undefined
        if(ingredients_id && !Array.isArray(ingredients_id)) {
            throw new AppError('Ingredients must be an array of integers');
        } else if (ingredients_id) {
            
            // check if ingredients exists
            const ingredients = await knex('Ingredients').whereIn('id', ingredients_id).select('id');
            if (ingredients.length !== ingredients_id.length) {
                throw new AppError('One or more ingredients not found');
            }
        }   

        // check if dish exists
        if (!id) {
            throw new AppError('Dish not found');
        }

        // console.log(name);
        await knex('Dishes').where({ id }).update({
            name,
            description,
            price,
            category_id,
        });
    
        // update ingredients for dish_ingredients relationship
        if(ingredients_id && ingredients_id.length > 0) {
            await knex('DishIngredients').where({ dish_id: id }).delete();

            const dish_ingredients = ingredients_id.map(ingredient_id => ({ dish_id: id, ingredient_id }));
            // console.log(dish_ingredients);
            await knex('DishIngredients').insert(dish_ingredients);

        }

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        // check if dish exists
        const checkDishExists = await knex('Dishes').where({ id }).first();
        if (!checkDishExists) {
            throw new AppError('Dish not found');
        }

        await knex('Dishes').where({ id }).delete();

        // delete dish_ingredients relation
        await knex('DishIngredients').where({ id }).delete();

        // delete dish_ingredients relation
        await knex('DishIngredients').where({ dish_id: id }).delete();

        // check if relation was deleted successfully
        const checkRelation = await knex('DishIngredients').where({ dish_id: id }).select('id');
        if (checkRelation.length > 0) {
            throw new AppError('Error deleting dish_ingredients relation. Dish not deleted.');
        }


        return response.json();
    }
    async index(request, response) {

        const dishes = await knex('Dishes')

        return response.json(dishes);
    }

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex('Dishes').where({ id }).first();

        return response.json(dish);
    }
}

module.exports = DishesController;