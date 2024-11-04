const AppError = require('../utils/AppError');

class SearchService {
    constructor(searchRepository) {
        this.searchRepository = searchRepository;
    }

    async search(query) {
        if (!query) {
            throw new AppError('Search query must be provided');
        }

        const dishesByName = await this.searchRepository.findDishesByName(query);
        const ingredients = await this.searchRepository.findIngredientsByName(query);

        let dishesByIngredients = [];
        if (ingredients.length > 0) {
            const ingredientIds = ingredients.map(ingredient => ingredient.id);
            dishesByIngredients = await this.searchRepository.findDishesByIngredientIds(ingredientIds);
        }

        const allDishes = [...dishesByName, ...dishesByIngredients];
        const uniqueDishes = Array.from(new Set(allDishes.map(dish => dish.id)))
            .map(id => allDishes.find(dish => dish.id === id));

        return uniqueDishes;
    }
}

module.exports = SearchService; 