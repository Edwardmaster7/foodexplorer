const SearchService = require('./SearchService');
const AppError = require('../utils/AppError');

describe('SearchService', () => {
    let searchService;
    let searchRepositoryMock;

    beforeEach(() => {
        searchRepositoryMock = {
            findDishesByName: jest.fn(),
            findIngredientsByName: jest.fn(),
            findDishesByIngredientIds: jest.fn()
        };

        searchService = new SearchService(searchRepositoryMock);
    });

    describe('search', () => {
        it('should throw error when query is not provided', async () => {
            await expect(searchService.search())
                .rejects
                .toEqual(new AppError('Search query must be provided'));
        });

        it('should return unique dishes when searching by name only', async () => {
            const mockDishes = [
                { id: 1, name: 'Pasta' },
                { id: 2, name: 'Pizza' }
            ];

            searchRepositoryMock.findDishesByName.mockResolvedValue(mockDishes);
            searchRepositoryMock.findIngredientsByName.mockResolvedValue([]);

            const result = await searchService.search('pa');

            expect(result).toEqual(mockDishes);
            expect(searchRepositoryMock.findDishesByName).toHaveBeenCalledWith('pa');
            expect(searchRepositoryMock.findIngredientsByName).toHaveBeenCalledWith('pa');
            expect(searchRepositoryMock.findDishesByIngredientIds).not.toHaveBeenCalled();
        });

        it('should return combined unique dishes when searching by both name and ingredients', async () => {
            const dishesByName = [
                { id: 1, name: 'Pasta' }
            ];
            const ingredients = [
                { id: 1, name: 'Tomato' }
            ];
            const dishesByIngredients = [
                { id: 1, name: 'Pasta' },
                { id: 2, name: 'Pizza' }
            ];

            searchRepositoryMock.findDishesByName.mockResolvedValue(dishesByName);
            searchRepositoryMock.findIngredientsByName.mockResolvedValue(ingredients);
            searchRepositoryMock.findDishesByIngredientIds.mockResolvedValue(dishesByIngredients);

            const result = await searchService.search('pa');

            expect(result).toHaveLength(2);
            expect(searchRepositoryMock.findDishesByIngredientIds).toHaveBeenCalledWith([1]);
        });
    });
}); 