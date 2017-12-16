$().ready(function(){

var userSearch = "";


$("#run-search").on("click", function(event) {
  event.preventDefault();
  
  userSearch = $("#search-term").val().trim();
  
  console.log("userInput "+ userSearch);

  var userButton = $(`<button class="fav" data-category="${userSearch}">${userSearch}</button>`);

  console.log("userInput "+ userButton);

  $("#buttonsBlock").append(userButton);

  $("#gifsBlock").empty();

});

$(document).on("click",".fav", function() {

    var category = $(this).attr("data-category");

    // Constructing a URL to search Giphy for the clicked/searched category
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    category + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After the data comes back from the API
      .done(function(response) {
        $("#gifsBlock").empty();
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            // Creating a div with the class "item"
            var gifsDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var categoryImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the result item
            categoryImage.attr("src", results[i].images.fixed_height_still.url)

            // Modifying the data state on click
            .attr("data-still", results[i].images.fixed_height_still.url)
            .attr("data-animate", results[i].images.fixed_height.url)
            .attr("data-state", "still")
            .attr("class", "gif");

            // Appending the paragraph and categoryImage we created to the "gifDiv" div we created
            gifsDiv.append(p);
            gifsDiv.append(categoryImage);

            // Prepending the gifDiv to the "#gifsBlock" div in the HTML
            $("#gifsBlock").prepend(gifsDiv);
          }

        }
      });
  });
          $(document).on("click", '.gif', toggleAnimation);	
          
            function toggleAnimation()
	        {
             let state = $(this).attr("data-state");
             console.log(state);
             if(state === "still")
            {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state","animate");
            }
            else if(state === 'animate')
            {
                 $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state","still");
               
            }
	        }

});