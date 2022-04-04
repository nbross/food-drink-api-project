// this will be responsible for generating wha comes out of the search history section
//
const displaySearchHistory = (newSearchTerm) => {
    let searchHistory = {};
    if (localStorage.getItem('search_history')) {
        searchHistory = JSON.parse(localStorage.getItem('search_history'));
    };
}
//Check if search history includes this term//
if (newSearchTerm in searchHistory) {}
else if (newSearchTerm && newSearchTerm.length > 0) {
    //If there is a new term it will be added to search history//
    searchHistory[newSearchTerm] = {text: newSearchTerm};
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
};

//if the search history is not empty, it shows on the page//
if (object.keys(searchHistory).length > 0){
    $('#history').addClass('hidden');
    updateSearchHistoryList(searchHistory);
}