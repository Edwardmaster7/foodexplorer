const AppError = require("../utils/AppError");

class DishesService {
    constructor(dishRepository) {
        this.dishRepository = dishRepository;
    }

    async validateDishData({ name, description, price, category_id, ingredients_id }) {
        if (!name || !description || !price || !category_id || !ingredients_id) {
            throw new AppError("All fields are required");
        }

        if (price < 0) {
            throw new AppError("Price must be a positive decimal number");
        }

        if (!Array.isArray(ingredients_id)) {
            throw new AppError("Ingredients must be an array of integers");
        }
    }

    async checkCategoryExists(category_id) {
        const category = await this.dishRepository.findCategoryById(category_id);
        if (!category) {
            throw new AppError("Category not found");
        }
    }

    async checkIngredientsExist(ingredients_id) {
        const ingredients = await this.dishRepository.findIngredientsByIds(ingredients_id);
        if (ingredients.length !== ingredients_id.length) {
            throw new AppError("One or more ingredients not found");
        }
    }

    async checkDishExists(name) {
        const dishExists = await this.dishRepository.findDishByName(name);
        if (dishExists) {
            throw new AppError("Dish already exists");
        }
    }

    async createDish({ name, description, price, category_id, ingredients_id }) {
        await this.validateDishData({ name, description, price, category_id, ingredients_id });
        await this.checkCategoryExists(category_id);
        await this.checkIngredientsExist(ingredients_id);
        await this.checkDishExists(name);

        const [dish_id] = await this.dishRepository.insertDish({ 
            name, 
            description, 
            price, 
            category_id 
        });

        const dish_ingredients = ingredients_id.map(ingredient_id => ({
            dish_id,
            ingredient_id,
        }));

        await this.dishRepository.insertDishIngredients(dish_ingredients);

        const checkRelation = await this.dishRepository.findDishIngredientsByDishId(dish_id);
        if (checkRelation.length === 0) {
            await this.dishRepository.deleteDishById(dish_id);
            throw new AppError("Error inserting dish_ingredients relation. Dish not created.");
        }

        return dish_id;
    }

    async updateDish(id, { name, description, price, category_id, ingredients_id }) {
        if (!name && !description && !price && !category_id && !ingredients_id) {
            throw new AppError("At least one field must be provided");
        }

        if (price && price < 0) {
            throw new AppError("Price must be a positive decimal number");
        }

        if (category_id) {
            await this.checkCategoryExists(category_id);
        }

        if (ingredients_id) {
            if (!Array.isArray(ingredients_id)) {
                throw new AppError("Ingredients must be an array of integers");
            }
            await this.checkIngredientsExist(ingredients_id);
        }

        const dish = await this.dishRepository.findDishById(id);
        if (!dish) {
            throw new AppError("Dish not found");
        }

        if (name || description || price || category_id) {
            await this.dishRepository.updateDish(id, { name, description, price, category_id });
        }

        if (ingredients_id && ingredients_id.length > 0) {
            await this.dishRepository.deleteDishIngredients(id);

            const dish_ingredients = ingredients_id.map(ingredient_id => ({
                dish_id: id,
                ingredient_id,
            }));
            await this.dishRepository.insertDishIngredients(dish_ingredients);
        }
    }

    async deleteDish(id) {
        const dish = await this.dishRepository.findDishById(id);
        if (!dish) {
            throw new AppError("Dish not found");
        }

        await this.dishRepository.deleteDishById(id);
        await this.dishRepository.deleteDishIngredients(id);
    }

    async listDishes() {
        const dishes = await this.dishRepository.findAllDishes();
        return dishes.map(dish => {
            dish.ingredients = dish.ingredients ? dish.ingredients.split(",") : [];
            return dish;
        });
    }

    async getDish(id) {
        const dish = await this.dishRepository.findDishWithDetails(id);
        if (!dish) {
            throw new AppError("Dish not found");
        }

        dish.ingredients = dish.ingredients ? dish.ingredients.split(",") : [];
        return dish;
    }
}

module.exports = DishesService; 