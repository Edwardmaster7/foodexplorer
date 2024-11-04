const AppError = require("../utils/AppError");

class IngredientsService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async create(names) {
    if (!names) {
      throw new AppError("Name is required.");
    }

    if (!Array.isArray(names)) {
      throw new AppError("Names must be an array.");
    } else if (names.length === 0) {
      throw new AppError("At least one name is required.");
    }

    const existingIngredients = await this.ingredientsRepository.findByName(names);
    if (existingIngredients.length > 0) {
      throw new AppError("One or more ingredients already exists.");
    }

    const insertedIds = await this.ingredientsRepository.insert(names);
    return { id: insertedIds.map(id => id.id) };
  }

  async update(id, name) {
    if (!name) {
      throw new AppError("Name is required.");
    }

    const ingredient = await this.ingredientsRepository.findById(id);
    if (!ingredient) {
      throw new AppError("Ingredient not found.");
    }

    await this.ingredientsRepository.update(id, { name });
  }

  async delete(id) {
    const ingredient = await this.ingredientsRepository.findById(id);
    if (!ingredient) {
      throw new AppError("Ingredient not found.");
    }

    const ingredientInDish = await this.ingredientsRepository.findInDishes(id);
    if (ingredientInDish) {
      throw new AppError("Ingredient is used in a dish. Cannot delete it.");
    }

    await this.ingredientsRepository.deleteById(id);
  }

  async index() {
    return await this.ingredientsRepository.findAll();
  }

  async show(id) {
    const ingredient = await this.ingredientsRepository.findById(id);
    if (!ingredient) {
      throw new AppError("Ingredient not found.");
    }
    return ingredient;
  }
}

module.exports = IngredientsService; 