const CategoriesService = require('./CategoriesService');
const AppError = require('../utils/AppError');

describe('CategoriesService', () => {
    let categoriesService;
    let categoriesRepositoryMock;

    beforeEach(() => {
        categoriesRepositoryMock = {
            findByNames: jest.fn(),
            insert: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            findDishesById: jest.fn()
        };

        categoriesService = new CategoriesService(categoriesRepositoryMock);
    });

    describe('create', () => {
        it('should create categories successfully', async () => {
            const names = ['Main Course', 'Dessert'];
            categoriesRepositoryMock.findByNames.mockResolvedValue([]);
            categoriesRepositoryMock.insert.mockResolvedValue([1, 2]);

            await categoriesService.create(names);

            expect(categoriesRepositoryMock.insert).toHaveBeenCalledWith(
                names.map(name => ({ name }))
            );
        });

        it('should throw error when names is not an array', async () => {
            await expect(categoriesService.create('Main Course'))
                .rejects
                .toEqual(new AppError("Names is required and must be an array."));
        });

        it('should throw error when names array is empty', async () => {
            await expect(categoriesService.create([]))
                .rejects
                .toEqual(new AppError("At least one name is required."));
        });

        it('should throw error when category already exists', async () => {
            const names = ['Main Course'];
            categoriesRepositoryMock.findByNames.mockResolvedValue([{ id: 1 }]);

            await expect(categoriesService.create(names))
                .rejects
                .toEqual(new AppError("One or more categories already exists."));
        });
    });

    describe('update', () => {
        it('should update category successfully', async () => {
            categoriesRepositoryMock.findById.mockResolvedValue({ id: 1 });
            
            await categoriesService.update(1, 'New Name');

            expect(categoriesRepositoryMock.update).toHaveBeenCalledWith(1, 'New Name');
        });

        it('should throw error when category not found', async () => {
            categoriesRepositoryMock.findById.mockResolvedValue(null);

            await expect(categoriesService.update(1, 'New Name'))
                .rejects
                .toEqual(new AppError("Categories not found."));
        });

        it('should throw error when name is not provided', async () => {
            await expect(categoriesService.update(1, ''))
                .rejects
                .toEqual(new AppError("Category name is required."));
        });
    });

    describe('delete', () => {
        it('should delete category successfully', async () => {
            categoriesRepositoryMock.findById.mockResolvedValue({ id: 1 });
            categoriesRepositoryMock.findDishesById.mockResolvedValue(null);

            await categoriesService.delete(1);

            expect(categoriesRepositoryMock.delete).toHaveBeenCalledWith(1);
        });

        it('should throw error when category has associated dishes', async () => {
            categoriesRepositoryMock.findById.mockResolvedValue({ id: 1 });
            categoriesRepositoryMock.findDishesById.mockResolvedValue({ id: 1 });

            await expect(categoriesService.delete(1))
                .rejects
                .toEqual(new AppError("Cannot delete a category that has dishes associated with it. Update them first."));
        });
    });

    describe('show', () => {
        it('should return category successfully', async () => {
            const mockCategory = { id: 1, name: 'Main Course' };
            categoriesRepositoryMock.findById.mockResolvedValue(mockCategory);

            const result = await categoriesService.show(1);

            expect(result).toEqual(mockCategory);
        });

        it('should throw error when category not found', async () => {
            categoriesRepositoryMock.findById.mockResolvedValue(null);

            await expect(categoriesService.show(1))
                .rejects
                .toEqual(new AppError("Category not found."));
        });
    });
}); 