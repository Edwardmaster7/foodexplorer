const IngredientsRepository = require("../repositories/IngredientsRepository");
const IngredientsService = require("../services/IngredientsService");

class IngredientsController {
  async create(request, response) {
    const { names } = request.body;
    const ingredientsRepository = new IngredientsRepository();
    const ingredientsService = new IngredientsService(ingredientsRepository);

    const result = await ingredientsService.create(names);
    return response.status(201).json(result);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    const ingredientsRepository = new IngredientsRepository();
    const ingredientsService = new IngredientsService(ingredientsRepository);

    await ingredientsService.update(id, name);
    return response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;
    const ingredientsRepository = new IngredientsRepository();
    const ingredientsService = new IngredientsService(ingredientsRepository);

    await ingredientsService.delete(id);
    return response.status(200).json();
  }

  async index(request, response) {
    const ingredientsRepository = new IngredientsRepository();
    const ingredientsService = new IngredientsService(ingredientsRepository);

    const ingredients = await ingredientsService.index();
    return response.json(ingredients);
  }

  async show(request, response) {
    const { id } = request.params;
    const ingredientsRepository = new IngredientsRepository();
    const ingredientsService = new IngredientsService(ingredientsRepository);

    const ingredient = await ingredientsService.show(id);
    return response.json(ingredient);
  }
}

module.exports = IngredientsController;