const FavouritesService = require('./FavouritesService');
const AppError = require('../utils/AppError');

describe('FavouritesService', () => {
    let favouritesService;
    let favouritesRepositoryMock;

    beforeEach(() => {
        favouritesRepositoryMock = {
            findDishById: jest.fn(),
            findFavourite: jest.fn(),
            insertFavourite: jest.fn(),
            deleteFavourite: jest.fn(),
            findAllFavourites: jest.fn(),
            findUserFavourites: jest.fn()
        };

        favouritesService = new FavouritesService(favouritesRepositoryMock);
    });

    describe('addFavourite', () => {
        it('should throw error if user is admin', async () => {
            await expect(favouritesService.addFavourite(1, 1, true))
                .rejects
                .toEqual(new AppError('Admins can not add a favourite'));
        });

        it('should throw error if dish not found', async () => {
            favouritesRepositoryMock.findDishById.mockResolvedValue(null);

            await expect(favouritesService.addFavourite(1, 1, false))
                .rejects
                .toEqual(new AppError('Dish not found'));
        });

        it('should throw error if favourite already exists', async () => {
            favouritesRepositoryMock.findDishById.mockResolvedValue({ id: 1 });
            favouritesRepositoryMock.findFavourite.mockResolvedValue({ id: 1 });

            await expect(favouritesService.addFavourite(1, 1, false))
                .rejects
                .toEqual(new AppError('Favourite already exists'));
        });

        it('should add favourite successfully', async () => {
            favouritesRepositoryMock.findDishById.mockResolvedValue({ id: 1 });
            favouritesRepositoryMock.findFavourite.mockResolvedValue(null);
            favouritesRepositoryMock.insertFavourite.mockResolvedValue({ id: 1 });

            const result = await favouritesService.addFavourite(1, 1, false);

            expect(result).toEqual({ id: 1 });
            expect(favouritesRepositoryMock.insertFavourite).toHaveBeenCalledWith(1, 1);
        });
    });

    describe('removeFavourite', () => {
        it('should remove favourite successfully', async () => {
            favouritesRepositoryMock.deleteFavourite.mockResolvedValue(1);

            const result = await favouritesService.removeFavourite(1, 1);

            expect(result).toEqual(1);
            expect(favouritesRepositoryMock.deleteFavourite).toHaveBeenCalledWith(1, 1);
        });
    });

    describe('listFavourites', () => {
        it('should list all favourites for admin', async () => {
            const mockFavourites = [{ id: 1, name: 'Dish 1' }];
            favouritesRepositoryMock.findAllFavourites.mockResolvedValue(mockFavourites);

            const result = await favouritesService.listFavourites(1, true);

            expect(result).toEqual(mockFavourites);
            expect(favouritesRepositoryMock.findAllFavourites).toHaveBeenCalled();
        });

        it('should list user favourites', async () => {
            const mockFavourites = [{ id: 1, name: 'Dish 1' }];
            favouritesRepositoryMock.findUserFavourites.mockResolvedValue(mockFavourites);

            const result = await favouritesService.listFavourites(1, false);

            expect(result).toEqual(mockFavourites);
            expect(favouritesRepositoryMock.findUserFavourites).toHaveBeenCalledWith(1);
        });
    });
}); 