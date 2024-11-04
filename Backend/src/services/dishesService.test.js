const DishesService = require('./DishesService');
const AppError = require('../utils/AppError');

describe('DishesService', () => {
    let dishesService;
    let dishRepositoryMock;

    beforeEach(() => {
        dishRepositoryMock = {
            findCategoryById: jest.fn(),
            findIngredientsByIds: jest.fn(),
            findDishByName: jest.fn(),
            insertDish: jest.fn(),
            insertDishIngredients: jest.fn(),
            findDishIngredientsByDishId: jest.fn(),
            deleteDishById: jest.fn(),
            findDishById: jest.fn(),
            updateDish: jest.fn(),
            deleteDishIngredients: jest.fn(),
            findAllDishes: jest.fn(),
            findDishWithDetails: jest.fn()
        };

        dishesService = new DishesService(dishRepositoryMock);
    });

    describe('createDish', () => {
        const validDishData = {
            name: 'Test Dish',
            description: 'Test Description',
            price: 10.99,
            category_id: 1,
            ingredients_id: [1, 2]
        };

        it('should create dish successfully', async () => {
            dishRepositoryMock.findCategoryById.mockResolvedValue({ id: 1 });
            dishRepositoryMock.findIngredientsByIds.mockResolvedValue([{ id: 1 }, { id: 2 }]);
            dishRepositoryMock.findDishByName.mockResolvedValue(null);
            dishRepositoryMock.insertDish.mockResolvedValue([1]);
            dishRepositoryMock.findDishIngredientsByDishId.mockResolvedValue([{ id: 1 }]);

            const result = await dishesService.createDish(validDishData);

            expect(result).toBe(1);
            expect(dishRepositoryMock.insertDish).toHaveBeenCalled();
            expect(dishRepositoryMock.insertDishIngredients).toHaveBeenCalled();
        });

        it('should throw error when category not found', async () => {
            dishRepositoryMock.findCategoryById.mockResolvedValue(null);

            await expect(dishesService.createDish(validDishData))
                .rejects
                .toEqual(new AppError('Category not found'));
        });

        it('should throw error when dish already exists', async () => {
            dishRepositoryMock.findCategoryById.mockResolvedValue({ id: 1 });
            dishRepositoryMock.findIngredientsByIds.mockResolvedValue([{ id: 1 }, { id: 2 }]);
            dishRepositoryMock.findDishByName.mockResolvedValue({ id: 1 });

            await expect(dishesService.createDish(validDishData))
                .rejects
                .toEqual(new AppError('Dish already exists'));
        });
    });

    // Additional test cases for update, delete, list, and show methods would follow
    // similar patterns
}); 
