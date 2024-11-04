const SearchRepository = require('../repositories/SearchRepository');
const SearchService = require('../services/SearchService');

class SearchController {
    async search(request, response) {
        const { query } = request.params;
        
        const searchRepository = new SearchRepository();
        const searchService = new SearchService(searchRepository);
        
        const dishes = await searchService.search(query);
        
        return response.json({ dishes });
    }
}

module.exports = SearchController;
