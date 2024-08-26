const knex = require('knex');

const AppError = require('../utils/AppError');

class CategoryController {

    async create(request, response) {
        const { name } = request.body

        // validate name is provided and not empty
        if (!name) {
            throw new AppError("Name is required.")
        }

        // check if category already exists
        const checkCategoryExists = await knex("Category").where({ name })
        if (checkCategoryExists) {
            throw new AppError("Category already exists.")
        }

        // await knex("").insert({  })

        return response.status(201).json()
    }

    async update(request, response) {
        const { id } = request.params;
        const { name } = request.body;

        if (!name) {
            throw new AppError('Name is required');
        }

        await knex('Category').where({ id }).update({ name });

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('Category').where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const category = await knex('Category');

        return response.json(category);
    }

    async show(request, response) {
        const { id } = request.params;

        const category = await knex('Category').where({ id }).first();

        return response.json(category);
    }
}

module.exports = CategoryController;