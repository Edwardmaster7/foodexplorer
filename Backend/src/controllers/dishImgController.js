const DishRepository = require('../repositories/DishRepository');
const DishImageService = require('../services/DishImageService');

class DishImgController {
    async update(request, response) {
        const { id } = request.params;
        const imgFilename = request.file.filename;

        const dishRepository = new DishRepository();
        const dishImageService = new DishImageService(dishRepository);

        try {
            const updatedDish = await dishImageService.updateDishImage(id, imgFilename);
            return response.json(updatedDish);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

module.exports = DishImgController;