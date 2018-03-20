$( document ).ready(function() {
	$("#login_form").submit(function(event){
		event.preventDefault();
		console.log($(this).serializeArray());
		<!--$.post("api", $(this).serializeArray(), function(result){ -->
		$.get("https://dawa.aws.dk/autocomplete?kommunekode=101&q=" + $("#letter").val() + "&type=adresse&caretpos=2&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true&fuzzy=", function(result){
		
			console.log(result);
			$("body").removeClass("not-logged-in").addClass("logged-in");
		});
	});
	
	$("#guess_form").submit(function(event){
		event.preventDefault();
		console.log($(this).serializeArray());
		$.get("http://localhost:8080/RestService/webresources/generic/jsontest", function(result){
		
		//$.get("https://dawa.aws.dk/autocomplete?kommunekode=101&q=" + $("#letter").val() + "&type=adresse&caretpos=2&supplerendebynavn=true&stormodtagerpostnumre=true&multilinje=true&fuzzy=", function(result){
			console.log(result);
			//$("#result").text(result[0]['kredit']);
			$("#result").text(result['json']);
		});
	});
});