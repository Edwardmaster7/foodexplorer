const DiskStorage = require('../providers/DiskStorage');
const AppError = require('../utils/AppError');

class DishImageService {
    constructor(dishRepository) {
        this.dishRepository = dishRepository;
    }

    async updateDishImage(id, imgFilename) {
        const dish = await this.dishRepository.findDishById(id);

        if (!dish) {
            throw new AppError('Dish not found.');
        }

        const diskStorage = new DiskStorage();

        if (dish.image) {
            await diskStorage.deleteFile(dish.image);
        }

        await diskStorage.saveFile(imgFilename);

        dish.image = imgFilename;

        return await this.dishRepository.updateDishImage(id, dish.image);
    }
}

module.exports = DishImageService; 