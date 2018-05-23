$(document).ready(function () {

    var gamepath;
    getHighscore();

// Login form
    $("#login_form").submit(function (event) {

        event.preventDefault();
        var user = $("#username").val();
        var pass = $("#password").val();

        var sendInfo = {
            username: user,
            password: pass
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/web/api/login",
            //url: "http://ubuntu4.saluton.dk:38055/web/api/login",
            data: JSON.stringify(sendInfo),
            contentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    gamepath = response.gamepath;
                    $("#login").hide();
                    $("#game").show();

                    // Init game in progress
                    $.get(gamepath, function (result) {
                        updateGameInfo(result);
                        $("#name").html("Logget ind som:<br>" + result.name);
                    });
                },
                401: function () {
                    $("#password").val(""); // empty box
                    $("#feedback").html('<div class="alert alert-warning alert-dismissible fade show" role="alert">Forkert brugernavn eller kode.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                },
                503: function () {
                    $("#feedback").html('<div class="alert alert-warning alert-dismissible fade show" role="alert">Servicen er i øjeblikket utilgængeligt.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                }
            }
        });
    });

// Update gameplay data
    $("#guess_form").submit(function (event) {
        event.preventDefault();
        // Post the guessed letter to api
        $.post(gamepath, $("#letter").serialize(), function (result) {
            $("#result").html(result);
            $("#result2").html(result);
        });

        $.get(gamepath, function (result) {
            updateGameInfo(result);
            $("#letter").val(""); // empty box

            if (result.gameover === "true") {
                $("#guess_form").hide();
                $("#reset_form").show();
            }
        });
    });

    $("#button").click(function (event) {
        event.preventDefault();
        $.post(gamepath, $("#reset").serialize(), function (result) {
            $("#result").html(result);
        });
        $.get(gamepath, function (result) {
            updateGameInfo(result);
        });
        $("#reset_form").hide();
        $("#guess_form").show();
    });

    function updateGameInfo(info) {
        $("#image").attr("src", "grafik/forkert" + info.wrongletters + ".png");
        $("#usedletters").html(info.usedletters);
        $("#invisibleword").html(info.invisibleword);
    }

    function getHighscore() {
        $.getJSON("http://localhost:8080/web/api/highscore", function (data) {
            var test = "";
            $(data.highscores).each(function(i, scores) {
                test += scores.username + " : " + scores.score + "<br>";
            });
            $("#highscore").html(test);
        });
    }
});