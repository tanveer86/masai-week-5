$("#idEmail").hide();
$("#idPassword").hide();
$("#registerButton").hide();
$("#myDetails").hide();
$("#singleMovieDiv").hide();
$("#searchOption").hide();

$('#nameInput').keyup(function() {

    var nameLength = $(this).val().length;

    if (nameLength < 3) {
        $("#nameError").text('Please enter atelest 3 chracters');
        $("#idEmail").hide();
        $("#idPassword").hide();
        $("#registerButton").hide();
    } else if (nameLength >= 3 && nameLength < 11) {
        $("#nameError").text('');
        $("#idEmail").show();
    } else {
        $("#nameError").text('Sorry, no more than 10 characters');
        $("#idEmail").hide();
        $("#idPassword").hide();
        $("#registerButton").hide();
    }   
});

$('#emailInput').keyup(function(){
    var atRate = $(this).val().search('@');
    var com = $(this).val().search('.com');

    if(atRate < 1){
        $("#emailError").text('Please enter a vaild email id');
        $("#idPassword").hide();
        $("#registerButton").hide();
    } else if(com > atRate + 2) {
        $("#emailError").text('');
        $("#idPassword").show();
    }else{
        $("#emailError").text('Please enter a vaild email id');
        $("#idPassword").hide();
        $("#registerButton").hide();
    }
})

$("#passwordInput").keyup(function(){
    var passNumber = $(this).val();
    
    if (passNumber != Number(passNumber)) {
        $("#passwordError").text('Please enter only Numbers');
        $("#registerButton").hide();
    } else if(passNumber.length == 10){
        $("#passwordError").text('');
        $("#registerButton").show();
    }else{
        $("#passwordError").text('Please enter 10 digit Number');
        $("#registerButton").hide();
    }
})

$("#registerButton").click(function(){
    var nameValue = $("#nameInput").val();
    var emailValue = $("#emailInput").val();
    var passwordValue = $("#passwordInput").val();
    // Got this date function from mozilla
    var todayDate = new Date(1567783469196).toDateString();

    if (nameValue != '' && emailValue != '' && passwordValue != '') {
        $("#inputTag").hide();
        $("#displayTag").show();
        $("#myDetails").show(3000);
        $("#searchOption").show();

        $("#detailsDiv").append("<h1 id='nameTag' class='mb-3'> Your Name: " + nameValue + "</h1>");
        $("#nameTag").append("<h2 id='emailTag'>Your Email: " + emailValue + "</h2>");
        $("#emailTag").append("<h2 id='lastLoginTag'>Your Last Login: " + todayDate + "</h2>");
        $("#welcomeMessage").append("<p>Dear " + "<strong>" + nameValue + "</strong>" + ", we have sent you an email for verification. We requests you to kindly click and verifiy your email id.</p>")

    } else {
        alert('All fields are required!');
    }
})

$("#singleMovie").click(function(){
    var movieInput = $("#movieInput").val();
    $.ajax({
      url: "http://www.omdbapi.com/?apikey=b19722fa&t=" + movieInput,
    })
    .done(function(movieData) {

        if(movieData.Response == 'True'){
            $("#singleMovieDiv").show();

            if(movieData.Poster.length < 4){
                $("#singleMovieImage").attr("src", "https://www.alpineflorist.co.nz/wp-content/uploads/2018/07/image-coming-soon.jpg");
            }else {
                $("#singleMovieImage").attr("src", movieData.Poster);
            }

            $("#singleMovieTitle").text("Movie Name: " + movieData.Title);
            $("#singleMovieDate").text("Release Date: " + movieData.Released);
            $("#singleMovieRating").text("IMDB Rating: " + movieData.imdbRating);
            $("#singleMovieGenre").text("Genre: " + movieData.Genre);
            $("#singleMovieActors").text("Actors: " + movieData.Actors);
            $("#singleMovieDirector").text("Director: " + movieData.Director);
            $("#singleMoviePlot").text("Plot: " + movieData.Plot);
        }else {
            alert("Sorry no Movies Found, Please Check Spelling");
        }
    });
  });

  $("#searchMovie").click(function(){
    var movieAllInput = $("#movieInput").val();
    $.ajax({
      url: "http://www.omdbapi.com/?apikey=b19722fa&s=" + movieAllInput,
    })
    .done(function(movieAllData) {

        if(movieAllData.Response == 'True'){
            $("#searchMovieDiv").show();

            movieAllData.Search.forEach(function(searchData){

                $("#searchMovieRow").append("<div id='searchSingleMovie' class='col-3 mb-4'><div id='searchCard' class='card'><img id='searchMovieImage' height='300' src='" + searchData.Poster + "'" + " class='card-img-top' alt=" + searchData.Title + "><div id='searchCardBody' class='card-body'><p id='searchMovieTitle' class='card-title font-weight-bold'>" + searchData.Title + "</p><p id='searchMovieYear' class='card-text'> Released Year: " + searchData.Year + "</p><a id='searchMovie' href='#' class='btn btn-danger'>Add to Watchlist</a></div></div></div>");

            })

        }else {
            alert("Sorry no Movies Found, Please Check Spelling");
        }

    });
    $("#searchMovieRow").empty();
  });

$("#singleMovieFavorite").click(function(){
    $("#singleMovieDiv").hide(3000);
})