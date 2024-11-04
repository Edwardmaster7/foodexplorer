const AppError = require('../utils/AppError');

class FavouritesService {
    constructor(favouritesRepository) {
        this.favouritesRepository = favouritesRepository;
    }

    async addFavourite(user_id, dish_id, isAdmin) {
        if (isAdmin) {
            throw new AppError('Admins can not add a favourite');
        }

        const dish = await this.favouritesRepository.findDishById(dish_id);
        if (!dish) {
            throw new AppError('Dish not found');
        }

        const favouriteExists = await this.favouritesRepository.findFavourite(user_id, dish_id);
        if (favouriteExists) {
            throw new AppError('Favourite already exists');
        }

        return await this.favouritesRepository.insertFavourite(user_id, dish_id);
    }

    async removeFavourite(user_id, dish_id) {
        return await this.favouritesRepository.deleteFavourite(user_id, dish_id);
    }

    async listFavourites(user_id, isAdmin) {
        if (isAdmin) {
            return await this.favouritesRepository.findAllFavourites();
        } else {
            return await this.favouritesRepository.findUserFavourites(user_id);
        }
    }
}

module.exports = FavouritesService; 