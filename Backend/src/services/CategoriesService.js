const AppError = require("../utils/AppError");

class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    async create(names) {
        if (!Array.isArray(names)) {
            throw new AppError("Names is required and must be an array.");
        }

        if (names.length === 0) {
            throw new AppError("At least one name is required.");
        }

        const existingCategories = await this.categoriesRepository.findByNames(names);
        if (existingCategories.length > 0) {
            throw new AppError("One or more categories already exists.");
        }

        return await this.categoriesRepository.insert(names.map(name => ({ name })));
    }

    async update(id, name) {
        if (!name) {
            throw new AppError("Category name is required.");
        }

        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new AppError("Categories not found.");
        }

        return await this.categoriesRepository.update(id, name);
    }

    async delete(id) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new AppError("Category not found.");
        }

        const dishExists = await this.categoriesRepository.findDishesById(id);
        if (dishExists) {
            throw new AppError("Cannot delete a category that has dishes associated with it. Update them first.");
        }

        return await this.categoriesRepository.delete(id);
    }

    async index() {
        return await this.categoriesRepository.findAll();
    }

    async show(id) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new AppError("Category not found.");
        }

        return category;
    }
}

module.exports = CategoriesService; 