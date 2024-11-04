const CategoriesRepository = require("../repositories/CategoriesRepository");
const CategoriesService = require("../services/CategoriesService");

class CategoriesController {
    async create(request, response) {
        const { names, name } = request.body;
        const categoriesRepository = new CategoriesRepository();
        const categoriesService = new CategoriesService(categoriesRepository);

        await categoriesService.create(names);

        return response.status(201).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { name } = request.body;
        
        const categoriesRepository = new CategoriesRepository();
        const categoriesService = new CategoriesService(categoriesRepository);

        await categoriesService.update(id, name);

        return response.status(200).json();
    }

    async delete(request, response) {
        const { id } = request.params;
        
        const categoriesRepository = new CategoriesRepository();
        const categoriesService = new CategoriesService(categoriesRepository);

        await categoriesService.delete(id);

        return response.status(200).json();
    }

    async index(request, response) {
        const categoriesRepository = new CategoriesRepository();
        const categoriesService = new CategoriesService(categoriesRepository);

        const categories = await categoriesService.index();

        return response.json(categories);
    }

    async show(request, response) {
        const { id } = request.params;
        
        const categoriesRepository = new CategoriesRepository();
        const categoriesService = new CategoriesService(categoriesRepository);

        const category = await categoriesService.show(id);

        return response.json(category);
    }
}

module.exports = CategoriesController; 