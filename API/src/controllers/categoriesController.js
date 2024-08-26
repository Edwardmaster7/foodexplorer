const knex = require('knex');

const AppError = require('../utils/AppError');

class CategoriesController {

    async create(request, response) {
        const { name } = request.body;

        if (!name) {
            throw new AppError('Name is required');
        }

        const category = await knex('Categories').insert({ name });

        return response.status(201).json(category);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name } = request.body;

        if (!name) {
            throw new AppError('Name is required');
        }

        await knex('Categories').where({ id }).update({ name });

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('Categories').where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const categories = await knex('Categories');

        return response.json(categories);
    }

    async show(request, response) {
        const { id } = request.params;

        const category = await knex('Categories').where({ id }).first();

        return response.json(category);
    }
}

module.exports = CategoriesController;