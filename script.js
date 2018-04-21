$(document).ready(function() {
	
	$("#login_form").submit(function(event){
		event.preventDefault();
		console.log($(this).serializeArray());
		//<!--$.post("api", $(this).serializeArray(), function(result){ -->
		$.get("https://dawa.aws.dk/autocomplete?kommunekode=101&q=" + $("#letter").val() + "&type=adresse&caretpos=2&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true&fuzzy=", function(result){
		
			console.log(result);
			$("body").removeClass("not-logged-in").addClass("logged-in");
		});
		$("#login_form").hide();
	});
	
		$.get("http://localhost:8080/RestServer/hangman/play/json/s114992", function(result){
		document.getElementById("usedletters").innerHTML = result.usedletters;
		document.getElementById("invisibleword").innerHTML = result.invisibleword;
	});
	
	$("#guess_form").submit(function(event){
		event.preventDefault();
		$.get("http://localhost:8080/RestServer/hangman/play/json/s114992?letter=" + $("#letter").val(), function(result){
		
			$("#image").attr("src","grafik/forkert" + result.wrongletters + ".png");
			console.log(result);
			document.getElementById("result").innerHTML = result.response;
			document.getElementById("usedletters").innerHTML = result.usedletters;
			document.getElementById("invisibleword").innerHTML = result.invisibleword;
			$("#letter").val("");
			});
	});
});
							/* 
							ids:
							feedback = login failed/succeed
							sendguess = der gættes på
							invisibleword = usynligt ord som skal gættes
							wrongguesses = forkerte ord
							*/