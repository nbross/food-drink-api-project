var getDrinkByIngredient = function() {
    var apiUrl = "https://wwww.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                getDrinkByIngredient();
            })
        } else {
            var errorMessage = $('<p>').text("No results found.  Please try another search!");
            $("#search-field").append(errorMessage);
        }
    });
};