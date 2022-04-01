// this for the input and what we can put in that text bar to give us a output
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita - by name
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin - by ingredient 

var heroFormEl = document.querySelector(".hero-form");
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
        response.json().then(function(){

        })
    });
}


heroFormEl.addEventListener("click");
