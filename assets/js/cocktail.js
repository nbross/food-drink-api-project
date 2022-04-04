// this for the input and what we can put in that text bar to give us a output
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita - by name
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin - by ingredient 

var heroFormEl = document.querySelector("search-field");
var drinkNameEl = document.querySelector("#name");
//this will be for the container to hold the api results
//var drinkContainerEl = document.querySelector();

var drinkSearchHandler = function(event) {
    event.preventDefault();
    var drinkSearchTerm = drinkNameEl.val.trim();

    if(drinkSearchTerm) {
        getDrinkResults(drinkSearchTerm);
        //drinkContainerEl.textContent = "";
        drinkNameEl.value = ""
    } else (document.getElementById('name').val.trim()=="")  
    {
        document.getElementById('error').innerHTML = "Please enter a drink name";
        return false;
    }
};

var getDrinkResults = function () {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/searchphp?s=margarita"

    fetch(apiUrl).then(function(response){
        if (response.ok) {
        response.json().then(function(){
            showDrinkOptions();
        });
} else {
    document.getElementById('error').innerHTML = ("Error: " + response.statusText);
}
    })
    .catch(function(error) {
        document.getElementById('error').innerHTML = "Unable to connect to";
    });

    var getDrinkByIngredient = function() {
        var apiUrl = "https://wwww.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
        fetch(apiUrl).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    getDrinkByIngredient();
                })
            } else {
                document.getElementById('error').innerHTML = ("Error: " + response.statusText);
            }
        });
    };
    
    var showDrinkOptions = function() {
        if(drinks.length === 0) {
            drinkContainerEl.textContent = "No drinks found";
        }
    };

heroFormEl.addEventListener("click", drinkSearchHandler);
}
