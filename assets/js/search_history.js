// this will be responsible for generating wha comes out of the search history section
const displaySearchHistory = (newSearchTerm) = {
    let searchHistory = {};
    if (localStorage.getItem('search_history')) {
        searchHistory = JSON.parse(localStorage.getItem('search_history'));
    };
}