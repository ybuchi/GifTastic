
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
            //Give the button an id equal to the category value
            newButton.attr("id", categoryArr[i]);
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
            //Give the button an id equal to the category value
            newButton.attr("id", categoryArr[i]);
            //Add the text to the button
            newButton.text(categoryArr[i]);
            //Append the button to its parent container
            $("#button-container").append(newButton);
        }
    }
};




// If a user inputs something, pass it into the add category function

$("#add-category").click(function(){
            
    var catInput = $("input[type=text][name=newcategory]").val().trim();
    console.log(catInput);
    //Make sure to clear the array of buttons before looping through the array again and adding the buttons
    $("#button-container").empty();

    addCategory(catInput);
    console.log(categoryArr);

})

});
//End of the Document Ready

//Create a function that will create the buttons. Use a loop that appensa a button for each string in the array.

//Make the AJAX call that will grap 10 STATIC, non animated gifs and will display them on the page. 

//Make sure to display the gif's rating as well, to be displayed under every gif.