// this will be used for when the page refreshes ie: what data will be loaded?
$(document).ready(function() {
    /* grabs the search history from localStorage and displays/loads it on the first page */
    displaySearchHistory();
    
    /* Event listener for submitting search form directly */
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        let searchTerm = $('#search-field').val();
        runSearch(searchTerm);
    });

    /* Event listener for clicking on search button */
    $('#search-button').on('click', function(event) {
        let drinkSearchTerm = $('#search-field').val();
        runSearch(drinkSearchTerm);
    });

    /* This function is to help run the search */
    const runSearch = (drinkSearchTerm) => {
        drinkSearchHandler(drinkSearchTerm);
    };
});