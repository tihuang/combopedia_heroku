$(document).ready(function() {
	var rating = 0;

	$("div.star-rating > s").on("click", function(e) {
        var numStars = parseInt($(e.target)[0].className[0])+1;
        setStars(numStars);
        $("#fireRating").removeClass("star-rating").removeClass();
        $("#fireRating").addClass(numStars.toString()).addClass("star-rating");
    });
	
	$('#fireRating').hover(
		function() {
			$(this).addClass('hover');
		},
		function() {
			$(this).removeClass('hover');
			highlight(rating);
		}
	);
	
	$('#fireRating > i').hover(
		function() {
			var num = $('#fireRating > i').index(this);
			highlight(num);
			
		}
		
	);
	
	$('#fireRating > i').click(function() {
		var num = $('#fireRating > i').index(this);
		rating = num;
		
	});
	

});


var highlight = function(num) {
	$('#fireRating').children().each(function(idx, elt) {
		if (idx <= num) {
			$(this).removeClass('icon-star-empty').addClass('icon-star');
		} else {
			$(this).removeClass('icon-star').addClass('icon-star-empty');
		}
	});
};

