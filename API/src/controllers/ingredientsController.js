const AppError = require("../utils/AppError")

const knex = require("../database/knex")

class IngredientsController {

    /**
     * Creates a new ingredient in the database.
     *
     * @param {Object} request - The request object containing the body data.
     * @param {Object} response - The response object to send back the result.
     * @param {string} request.body.name - The name of the ingredient to be created.
     * @throws Will throw an error if the name is not provided or if the ingredient already exists.
     * @returns {Object} - Returns a response object with status 201 and an empty JSON body.
     */
    async create(request, response) {
        const { name } = request.body

        // validate name is provided and not empty
        if (!name) {
            throw new AppError("Name is required.")
        }

        // check if ingredient already exists
        const checkIngredientExists = await knex("Ingredients").where({ name }).first()
        if (checkIngredientExists) {
            throw new AppError("Ingredient already exists.")
        }

        await knex("Ingredients").insert({ name })

        return response.status(201).json()
    }

    async update(request, response) {
        const { id } = request.params
        const { name } = request.body

        // validate name is provided and not empty
        if (!name) {
            throw new AppError("Name is required.")
        }

        // check if ingredient already exists
        const checkIngredientExists = await knex("Ingredients").where({ id }).first()
        if (!checkIngredientExists) {
            throw new AppError("Ingredient not found.")
        }

        await knex("Ingredients").where({ id }).update({ name })

        return response.status(200).json()
    }

    async delete(request, response) {
        const { id } = request.params

        // check if ingredient exists
        const checkIngredientExists = await knex("Ingredients").where({ id }).first()
        if (!checkIngredientExists) {
            throw new AppError("Ingredient not found.")
        }

        await knex("Ingredients").where({ id }).delete()

        return response.status(200).json()
    }

    async index(request, response) {
        const ingredients = await knex("Ingredients").orderBy("id", "desc")

        return response.json(ingredients)
    }

    async show(request, response) {
        const { id } = request.params

        const ingredient = await knex("Ingredients").where({ id }).first()

        // check if the ingredient was found
        if (!ingredient) {
            throw new AppError("Ingredient not found.")
        }

        return response.json(ingredient)
    }
}

module.exports = IngredientsController 