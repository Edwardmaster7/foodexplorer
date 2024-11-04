const FavouritesRepository = require('../repositories/FavouritesRepository');
const FavouritesService = require('../services/FavouritesService');

class FavouritesController {
    async create(request, response) {
        const { id: user_id, isAdmin } = request.user;
        const { id: dish_id } = request.params;

        const favouritesRepository = new FavouritesRepository();
        const favouritesService = new FavouritesService(favouritesRepository);

        const favourite = await favouritesService.addFavourite(user_id, dish_id, isAdmin);

        return response.status(201).json(favourite);
    }

    async delete(request, response) {
        const { id: user_id } = request.user;
        const { id: dish_id } = request.params;

        const favouritesRepository = new FavouritesRepository();
        const favouritesService = new FavouritesService(favouritesRepository);

        await favouritesService.removeFavourite(user_id, dish_id);

        return response.status(204).json();
    }

    async index(request, response) {
        const { id: user_id, isAdmin } = request.user;

        const favouritesRepository = new FavouritesRepository();
        const favouritesService = new FavouritesService(favouritesRepository);

        const favourites = await favouritesService.listFavourites(user_id, isAdmin);

        return response.json(favourites);
    }
}

module.exports = FavouritesController;