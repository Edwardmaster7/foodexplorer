const knex = require('knex');

const AppError = require('../utils/AppError');

class DishesController {

    async create(request, response) {
        const { name, description, price, category_id } = request.body;

        // validate fields
        if (!name || !description || !price  || !category_id) {
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

        await knex('Dishes').insert({
            name,
            description,
            price,
        });

        return response.status(201).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price, category_id } = request.body;

        // validate fields
        if (!name &&!description &&!price &&!category_id) {
            throw new AppError('At least one field must be provided');
        }

        if (price && price < 0) {
            throw new AppError('Price must be a positive decimal number');
        }

        // check if category exists
        const category = await knex('categories').where({ id: category_id }).first();
        if (!category) {
            throw new AppError('Category not found');
        }

        await knex('Dishes').where({ id }).update({
            name: name || null,
            description: description || null,
            price: price || null,
            category_id: category_id,
        });

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('Dishes').where({ id }).delete();

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