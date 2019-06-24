//global variables
var topics = ["yuck", "what", "laugh", "mad", "sad", "happy", "shock", "suprise", "excited", "scared", "love", "no", "amazing", "blank stare", "flirting", "judging you"];

var inputDiv = $("#input-field");
var buttonDiv = $("#buttons-container");
var resultsDiv = $("#data-result");
var userInput = $("#user-input");
var submitButton = $("#user-submit");


//buttons displayed on load
$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.html(topics[i]);
        newButton.addClass("reactions");
        newButton.attr("value", topics[i]);
        newButton.attr("id", "r" + i);
        buttonDiv.append(newButton);
    }
});

//on click drawing AJAX giphy query
function pickedReaction(){
    var clickedReaction = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +clickedReaction+ "&api_key=fV8e2q8TyrpgJ53QMy8id3VjWkURM40e&limit=10";

    console.log(queryURL);

    //AJAX request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data;
        for(var j = 0; j < results.length; j++){
            if(results[j].rating !== "r" && results[j].rating !== "pg-13"){
                var newDiv = $("<div class='gif-contain'>");
                newDiv.html(`<p>Rating: ${results[j].rating}</p>
                <img src=${results[j].images.fixed_height_still.url} data-still=${results[j].images.fixed_height_still.url} data-animate=${results[j].images.fixed_height.url} data-state="still" class="gif">`);
                resultsDiv.prepend(newDiv);
           }
        }
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
           
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
    });
};

//creates all buttons in topics array
function renewButtons() {
    buttonDiv.empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("reactions");
        newButton.attr("value", topics[i]);
        newButton.attr("id", "r" + i);
        newButton.html(topics[i]);
        buttonDiv.append(newButton);
    }
};

//on click function for submit button
submitButton.on("click", function(event){
    var reaction = "";
    event.preventDefault();
    reaction = userInput.val().trim();
    topics.push(reaction);
    renewButtons();
})

//click listener to all dynamically created buttons
$(document).on("click", ".reactions", pickedReaction);