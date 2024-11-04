const IngredientsService = require('./IngredientsService');
const AppError = require('../utils/AppError');

describe('IngredientsService', () => {
  let ingredientsService;
  let ingredientsRepositoryMock;

  beforeEach(() => {
    ingredientsRepositoryMock = {
      findByName: jest.fn(),
      insert: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      findAll: jest.fn(),
      findInDishes: jest.fn()
    };

    ingredientsService = new IngredientsService(ingredientsRepositoryMock);
  });

  describe('create', () => {
    it('should create ingredients successfully', async () => {
      const names = ['Salt', 'Pepper'];
      ingredientsRepositoryMock.findByName.mockResolvedValue([]);
      ingredientsRepositoryMock.insert.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const result = await ingredientsService.create(names);

      expect(result).toEqual({ id: [1, 2] });
      expect(ingredientsRepositoryMock.insert).toHaveBeenCalledWith(names);
    });

    it('should throw error when names are not provided', async () => {
      await expect(ingredientsService.create())
        .rejects
        .toEqual(new AppError("Name is required."));
    });

    it('should throw error when names are not an array', async () => {
      await expect(ingredientsService.create('Salt'))
        .rejects
        .toEqual(new AppError("Names must be an array."));
    });

    it('should throw error when names array is empty', async () => {
      await expect(ingredientsService.create([]))
        .rejects
        .toEqual(new AppError("At least one name is required."));
    });

    it('should throw error when one or more ingredients already exist', async () => {
      const names = ['Salt', 'Pepper'];
      ingredientsRepositoryMock.findByName.mockResolvedValue([{ id: 1 }]);

      await expect(ingredientsService.create(names))
        .rejects
        .toEqual(new AppError("One or more ingredients already exists."));
    });
  });

  // Additional tests for update, delete, index, and show methods can be added similarly
}); 