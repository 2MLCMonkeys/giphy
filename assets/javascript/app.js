//global variables
var topics = ["yuck", "what", "laugh", "mad", "sad", "happy", "shock", "suprise", "excited", "scared", "love", "no", "amazing", "blank stare", "flirting", "judging you"];

var inputDiv = $("#input-field");
var buttonDiv = $("#buttons-container");
var resultsDiv = $("#data-result");
var userInput = $("#user-input");
var submitButton = $("#user-submit");

//buttons displayed on load
//$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.html(topics[i]);
        newButton.addClass("reactions");
        newButton.attr("value", topics[i]);
        newButton.attr("id", "r" + i);
        buttonDiv.append(newButton);
    }
//});

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

var reaction = "";
submitButton.on("click", function(event){
    event.preventDefault();
    reaction = userInput.val().trim();
    topics.push(reaction);
    renewButtons();
})
