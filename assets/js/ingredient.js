var search;
var drinksArray = [];
var cocktailRecipeEl = document.querySelector("#recipe");
var searchContainerEl = document.querySelector("#search-results-container");

$(document).ready(function() {
    /* grabs the search history from localStorage and displays/loads it on the first page */
    displaySearchHistory();
    
    /* Event listener for submitting search form directly */
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        let drinkSearchTerm = $('#search-field-2').val();
        runSearch(drinkSearchTerm);
    });

    /* Event listener for clicking on search button */
    $('#search-button').on('click', function(event) {
        let drinkSearchTerm = $('#search-field-2').val();
        runSearch(drinkSearchTerm);
    });

    /* This function is to help run the search */
    const runSearch = (drinkSearchTerm) => {
        getDrinkResults(drinkSearchTerm);
    };
});

var getDrinkByIngredient = function(drinkSearchTerm) {
    var apiUrl = "https://wwww.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkSearchTerm;
    fetch(apiUrl).then(function(response) {
        var searchResultsEl = $('#search-results');
        drinksArray = response.drinks;
        
        searchResultsEl.empty();
        searchResultsContainerEl.classList = "display", "block";
        cocktailRecipeEl.classList = "display", "none";
     
     if (drinksArray === null) {
            var errorMessage = $('<p>').text("No results found.  Please try another search!");
            $("#search-field").append(errorMessage);
        } else {
            displaySearchHistory(drinkSearchTerm);
            var historyElement = document.querySelector('[data-search="' + drinkSearchTerm + '"]');

            var drinkOptionsReturned = '${ingredient} (${drinksArray.length})';

            var searchHistory = JSON.parse(localStorage.getItem('search_history'));
            searchHistory[drinkSearchTerm].text = drinkOptionsReturned;

            localStorage.setItem('search_hitsory', JSON.stringify(drinkSearchTerm));

            historyElement.innerHTML = drinkOptionsReturned;
            displayDrinkResults();

    };
});

var displayDrinkResults = function() {
    for(obj of drinksArray) {
        var resultElement = $('<div>').attr('class', 'column is-3');
        var resultsLink = $('<a id="' + obj.idDrink + '">');
        var resultImg = $('<img>').attr('width', '200');
        resultImg.attr('src', obj.strDrinkThumb);
        var resultPara = $('<p>').text(obj.strDrink);

        resultsLink.attr("onclick", "drinkRecipeSelected(event");
        resultsLink.append(resultImg);
        resultsLink.append(resultPara);
        resultElement.append(resultsLink);

        $('#search-results').append(resultElement);
        drinkRecipeSelected();

    }

    var drinkRecipeSelected = function(event) { 
        if(event.target.localName === "img" || event.target.localName === "p") {
            drinkSelection(event.target.parentNode.id);
        } else {
            drinkSelection(event.target.id);
        }
    }

    var drinkSelection = function(selDrinkId) {
        var drinkSelectionArray = [];

        var selDrinkObj = drinksArray.find(drinksArray => drinksArray.idDrink === selDrinkId);
        var drinkTitleEl = $('#title');
        var drinkImgEl = $('#recipe_img');
        var ingredientEl = $('#ingredient');
        var measurementEl = $('#measurement');
        var instructionsEl = $('#instructions');

        searchContainerEl.classList = 'display', 'none';
        cocktailRecipeEl.classList = "display", "block";
        ingredientEl.empty();
        measurementEl.empty();

        drinkTitleEl.text(selDrinkObj.strDrink);

        drinkImgEl.attr("src" , selDrinkObj.strDrinkThumb);
        instructionsEl.text(selDrinkObj.strInstructions);

        for( var i = 1; i <= 20; i++) {
            var ingredient = selDrinkObj["strIngredients" + i];
            var measurement = selDrinkObj["strMeasure" + i];

            if(ingredient !== ""  && ingredient !== null) {
                var ingredientListItem = $('<li>');

                ingredientListItem.text(ingredient);
                ingredientEl.append(ingredientListItem);

                var measurementListItem = $('<li>');

                measurementListItem.text(measurement);
                measurementEl.append(measurementListItem);
                drinkSelectionArray.push({"ingredient": ingredient, "quantitiy": measurement});
            } else {
                break;
            };
        }
    }


}
}