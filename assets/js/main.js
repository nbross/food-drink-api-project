var searchCocktail = document.getElementById('searchCocktail');

searchCocktail.addEventListener('change', () => {
    var searchValue = searchCocktail.value;
    getCocktailByName(searchValue);
})

//function with API to return a random cocktail
var randomCocktail = function() {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(apiUrl).then((response) => response.json())
    .then((cocktailInfo) => {
        displayrandomCocktail(cocktailInfo)
    })
    .catch((error) => {
        if (document.getElementById("search-cocktail").value == "") {
            showErrMsg(error)
        }else {
            hideErrMsg(error)
        };
    })
}

//function with API to search for a cocktail by name

var getCocktailByName = function (cocktail) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}";
    
    fetch(apiUrl).then((response) => response.json())
    .then((cocktailInfo) => {
        displayDrinkResult(cocktailInfo)
    })
    .catch((error) => {
        if (document.getElementById("search-cocktail").value == "") {
            showErrMsg(error)
        } else {
            hideErrMsg(error)
        };
    })
} 

//function to display random cocktail results
var displayRandomCocktail = function (cocktailInfo) {
    var { drinks } = cocktailInfo;
    var cocktailImgEl = document.getElementById('cocktailPicture');
    var cocktailPicture = ' <img class="drinkThumb" src="${drinks.[0].strDrinkThumb}">';
    cocktailImgEl.innerHTML = cocktailPicture;

    //display cocktail info
    var cocktailTitleEl= document.getElementById('cocktailTitle');

    var cocktailData = '<h4 class="cocktailName">${drinks[0].strDrink}</h4> <pclass+"typeOfglass">Type of glass:</p><p>${dinks[0].strGlass}</p. </br><p class="howToMake>How to make:</p>'
    cocktailTitleEl.innerHTML = cocktailData;

    var cocktailInfoEl = document.getElementById('howTo');

    var result = "";
    for(var i = 1; i <= 15; i++) {
        var measures = 'strMeasure' + i;
        var ingredients = 'strIngredients' + i;
        if ((drinks[0][measures]) && (drinks[0][ingredients]) !=="") {
            result = result = '<p>${drinks[0}{measures]} ${drinks[0][ingredients]}</p>';

            cocktailInfoEl.innerHTML = result;
        };
    }

        var cocktailInstructionsEl = document.getElementById('instructions');
        var instructions = '</br><p>${drinks[0].strInstructions}</p>';
        cocktailInstructionsEl.innerHTML = instructions;    
        }

        //display the drink by name results
        var displayDrinkResult = function(cocktailInfo) {
            var { drinks } = cocktailInfo;
            var cocktailImgEl = document.getElementById('cocktailPicture');
            var cocktailPicture = '<img class="drinkThumb" src="{drinks[0].strDrinkThumb}">';
            cocktailImgEl.innerHTML = cocktailPicture;

            //display cocktail info
            var cocktailTitleEl = document.getElementById('cocktailTitle');

            var cocktailData = '<h4 class="cocktailName">${drinks[0].strGlass}<p> </br><p class="howToMake">How to makes:</p>';
            cocktailTitleEl.innerHTML = cocktailData;

            var cocktailInfoEl = document.getElementById('howTo');

            var result = "";
            for(var i = 1; i <= 15; i++) {
                var measures = 'strMeasure' + i;
                var ingredients = 'strIngredients' + i;
                if((drinks[0][measures]) && (drinks[0][ingredients]) !== "") {
                    result= result + '<p>${drinks[0][measures]} ${drinks[0][ingredients]}</p>';

                    cocktailInfoEl.innerHTML = result;
                };
            }

            var cocktailInstructionsEl = document.getElementById('instructions');
            var instructions = '</br><p>${drinks[0].strInstructions}</p>';
             cocktailInstructionsEl.innerHTML = instructions;
        }

        //button shake
        $(document).ready(function() {
            $("#shakebutton").click(function(){
                $("#shakebutton").effect("shake", { times: 3}, 450);
            });
        });

        //Display error message for empty search

        var showErrMsg = function(error) {
            var errorEl = document.getElementById('errormsg');
            var errorMsg = '<p class"errormsg">Please enter a drink name!</p>';
            errorEl.innerHTML = errorMsg;
        };

        var hideErrMsg = function(error) {
            var errorEl = document.getElementById('errormsg');
            errorEl.innerHTML = "";
        };

