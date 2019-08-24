
$( document ).ready(function() {
    console.log( "ready!" );
//Create variable that is an array that will hold the categories that will be added as buttons and will be used in the AJAX query
var categoryArr = [];

//ADD CATEGORY: Create a function that will add a category that the user types into the form BUT WILL NOT ADD A DUPLICATE.
function addCategory(userInput){

    //create a variable that will flag a duplicate
    var duplicate = false

    //create a FOR loop to verify that the user's input is not the same as a value in the array
    for (i =0; i < categoryArr.length; i++){
        //If the user's input does not exist at categoryArray[i], check the next one. If it does exist at categoryArr[i], then break from the loop and do not add it to the array.
        if(userInput === categoryArr[i]){
            duplicate = true;
            break;
        }else{
            continue;
        } 
    }
    //End of the FOR loop
    console.log(duplicate);
    //If no duplicate was found by the end of the loop, then add the category to the array and display the button; else don't add it to the arry but do display buttons
    if (duplicate === false){
        categoryArr.push(userInput)
        //Create a loop to add the buttons in the array
        for (i = 0; i < categoryArr.length; i++){
            //Create a button element
            var newButton = $("<button>");
            //Give the button a class and an id equal to the category value
            newButton.addClass("category-button");
            //Give the button a property of data-sport
            newButton.attr("data-category", categoryArr[i]);
            //Add the text to the button
            newButton.text(categoryArr[i]);
            //Append the button to its parent container
            $("#button-container").append(newButton);
        }
        //End of this for loop
    }
    else{
        alert("This category has already been added.");
        for (i = 0; i < categoryArr.length; i++){
            //Create a button element
            var newButton = $("<button>");
            //Give the button a class
            newButton.addClass("category-button");
            //Give the button an id equal to the category value
            newButton.attr("data-category", categoryArr[i]);
            //Add the text to the button
            newButton.text(categoryArr[i]);
            //Append the button to its parent container
            $("#button-container").append(newButton);
        }
    }
};




// If a user inputs something, pass it into the add category function

$("#new-category").submit(function(event){
    console.log("The form has been submitted");
            
    var catInput = $("input[type=text][name=newcategory]").val().trim();
    console.log(catInput);
    //Make sure to clear the array of buttons before looping through the array again and adding the buttons
    $("#button-container").empty();

    addCategory(catInput);
    console.log(categoryArr);

    $("input[type=text][name=newcategory]").val("");

    //Had to use event.preventDefault() as there seemed to be some default functionality from the form button or from Bootstrap form functionality.
    event.preventDefault();

});

//A J A X : 
//When the user clicks a button that was created, use this button's ID to make an AJAX call
$(document).on("click",".category-button", function(){
//Empty whatever is inside the gif div
$("#gif-display").empty();
//Grab and store the data-category property of the button
var category = $(this).attr("data-category");
console.log("The value of the button I just clicked on is:" + category);

//Construct the query URL
var APIkey = "hZIRhlj4Dr05NlkiSLKE83kSVqKZ2cTZ";
var gifLimit = 10;
var queryURL = "https://api.giphy.com/v1/gifs/search?" + "api_key=" + APIkey + "&limit="+ gifLimit + "&offset=0&rating=G&lang=en" + "&q=" + category;

//Make the AJAX call that will grap 10 STATIC, non animated gifs and will display them on the page. 
$.ajax({
    url: queryURL,
    method: "GET"
}).then( function(response){

    var gifData = response.data;
    console.log(gifData);
    //Create and save references to the gifs and datapoints that we want to display
    //We want the gif and the rating

    //Display the data
    for (i = 0; i < gifData.length; i++){
    
        var gifDiv = $("<div>");
        var p = $("<p>").text("Rating: " + gifData[i].rating);
        var gifImage = $("<img>");
        gifImage.attr("src", gifData[i].images.original.url);

        gifDiv.append(p);
        gifDiv.append(gifImage);

        $("#gif-display").append(gifDiv);
}
    
    

    //We then need to reset this function so that the next time you click on any button, it won't return the gifs for the first button you clicked on. 



});




});
//^End of document click event



});
//^End of the Document Ready



//Make sure to display the gif's rating as well, to be displayed under every gif.