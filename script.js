$(document).ready(function() {
	
	$("#login_form").submit(function(event){
		event.preventDefault();
		console.log($(this).serializeArray());
		<!--$.post("api", $(this).serializeArray(), function(result){ -->
		$.get("https://dawa.aws.dk/autocomplete?kommunekode=101&q=" + $("#letter").val() + "&type=adresse&caretpos=2&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true&fuzzy=", function(result){
		
			console.log(result);
			$("body").removeClass("not-logged-in").addClass("logged-in");
		});
		$("#login_form").hide();
	});
	
	
	
	$("#guess_form").submit(function(event){
		event.preventDefault();
		$.get("http://localhost:8080/RestService/webresources/generic/jsontest?letter=" + $("#letter").val(), function(result){
		
		//$.get("https://dawa.aws.dk/autocomplete?kommunekode=101&q=" + $("#letter").val() + "&type=adresse&caretpos=2&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true&fuzzy=", function(result){
			console.log(result);
			document.getElementById("result").innerHTML = "Who: " + result.item1;
			document.getElementById("sendguess").innerHTML = "Du gættede på: " + $("#letter").val().toUpperCase();
			document.getElementById("invisibleword").innerHTML = "Who: " + result.item3;
			});
	});
});