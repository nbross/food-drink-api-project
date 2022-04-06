// this for the input and what we can put in that text bar to give us a output
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita - by name
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin - by ingredient 

var searchFormEl = document.querySelector("#search-field");
var drinkNameEl = document.querySelector("#name");
var cocktailArray = [];
var searchResultsContainerEl = document.querySelector("#search-results-container")
var cocktailRecipeEl = document.querySelector("#recipe");
var searchButtonEl = document.querySelector("#search-button");



var drinkSearchHandler = function(drinkSearchTerm) {
    
    if(drinkSearchTerm) {
        getDrinkResults(drinkSearchTerm);
        searchResultsContainerEl = "";
        drinkNameEl.value = ""
    } else{   
    var errorMessage = $('<p>').text("Please enter a cocktail name or type of alcohol to continue");
    $("#search-field").append(errorMessage);
    }
};

var getDrinkResults = function (drinkSearchTerm) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkSearchTerm;

    fetch(apiUrl).then(function(response){
        if (response.ok) {
        response.json().then(function(response){
        
            var searchResultsEl = ('#search-results');
            cocktailArray = response.drinks;
            //display options from user search
            searchResultsEl.empty();
            searchResultsContainerEl.classList= "display", "block";
            cocktailRecipeEl.classList = "display" , "none";
            
            displaySearchHistory(drinkSearchTerm);
            var savedDrinks = document.querySelector('[data-search="' + drinkSearchTerm + '"]');

            var drinkOptionsReturned = '${drinkSearchTerm} (${cocktailArray.length})';

            var searchHistory = JSON.parse(localStorage.getItem('search_history'));
            searchHistory[drinkSearchTerm].text = drinkOptionsReturned;
            
            //save history again
            localStorage.setItem('search_history', JSON.stringify(searchHistory));

            savedDrinks.innerHTML = drinkOptionsReturned;
            //show the search results
            for ( obj of cocktailArray) {
                var resultElement = $("<div>").attr('class', 'column is-3');
                var resultLink = $('<a id="' + obj.idDrink + '">');
                var resultImg = $('<img>').attr('width', '200');
                resultImg.attr('src', obj.strDrinkThumb);
                var resultPara = $('<p>').text(obj.strDrink);

                resultLink.attr("onClick", "drinkSelected(event)");
                resultLink.append(resultImg);
                resultLink.append(resultPara);
                resultElement.append(resultLink);

                //place the elements for the drink on the page
                $('#search-results').append(resultElement);
            };


        });
} else {
    var errorMessage = $('<p>').text("No results found.  Please try another search!");
    $("#search-field").append(errorMessage);
};
    })
    
var drinkSelected = function(event) {
    //determine what was selected
    if(event.target.localName=== "img" || event.target.localName === "p") {
        drinkSelection(event.target.parentNode.id);
    }else {
        drinkSelection(event.target.id);
    }
}

var drinkSelection = function(selDrinkId) {
    var drinkSelectionArray = [];

    var selDrinkObj = cocktailArray.find(cocktailArray => cocktailArray.idDrink === selDrinkId);
    var drinkTitleEl = $("#title");
    var drinkImgEl = $("#recipe_img");
    var ingredientEl = $('#ingredient');
    var measurementEl = $('#measurement');
    var instructionsEl = $('#instruction');

    searchResultsContainerEl.classList = ("display", "none");
    cocktailRecipeEl.classList = ("display", "block");
    ingredientEl.empty();
    measurementEl.empty();

    drinkTitleEl.text(selDrinkObj.strDrink);
    drinkImgEl.attr("src", selDrinkObj.strDrinkThumb);
    instructionsEl.text(selDrinkObj.strInstructions);

    for( var i = 1; i <= 20; i++) {
        var ingredient = selDrinkObj["strIngredient" + i];
        var measurement = selDrinkObj["strMeasure" + i];

        if(ingredient !=="" && ingredient !== null) {
            var ingredientListItem = $("<li>");

            ingredientListItem.text(ingredient);
            ingredientEl.append(ingredientListItem);

            var measurementListItem = $('<li>');

            measurementListItem.text(measurement);
            measurementEl.append(measurementListItem);

            drinkSelectionArray.push({"ingredient": ingredient, "quantity": measurement});
        } else {
            break;
        };
    }

}

searchButtonEl.addEventListener("click", getDrinkResults);
}
