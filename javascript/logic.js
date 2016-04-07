// VARIABLES

var science = [
"Magnets", 
"Robot", 
"Math", 
"Laser", 
"Bill Nye", 
"Nuclear", 
"diy", 
"Chemistry",
"Explosions",
"Pizza",
"Drones",
"Biology",
"Asteroids",
"Computers" ];


//Creates array buttons on load

$( document ).ready(function() {
    for(i=0;i<science.length;i++){
    	var newButton = $("<button class='button' id='"+science[i]+"'>");
    	newButton.text(science[i]);
    	$("#buttons").append(newButton);
    }

});


// submit and...
$("#submit").on("click", function() {

	
	var newScience =[];
	var input = $("#inputbox").val().trim();
//pushing input box value to array named newScience
	newScience.push(input);

    for(i=0;i<newScience.length;i++){
    	var newButton = $("<button class='button' id='"+newScience[i]+"'>");
    	newButton.text(newScience[i]);
    	$("#buttons").append(newButton);
    }


	return false;
	});



//this function takes the text of a button and parses it into the api url
$(document.body).on('click', '.button', function(){

    // button id from id attribute. 
    var query = $(this).attr("id");
    //save id to  var 'query'
    console.log(query);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&api_key=dc6zaTOxFJmzC"; 
             //ajax query function
    		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			
    				$("#gifs").empty();


				for(i=0;i<response.data.length;i++){
					var scienceGif = $("<img id='"+i+"' >");
					scienceGif.attr("src", response.data[i].images.fixed_height.url);
					scienceGif.attr("data-still", response.data[i].images.fixed_height_still.url);
					scienceGif.attr("data-animate", response.data[i].images.fixed_height.url);

					scienceGif.attr("class", "gif");
					$("#gifs").append(scienceGif);

					var rating = $("<div class='rating' >");
					rating.text("Rated:" + " " + JSON.stringify(response.data[i].rating));
					$("#gifs").append(rating);


				}




		});




});

$(document.body).on('click', '.gif', function(){
	var state = $(this).attr('data-state'); 

        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

	});



