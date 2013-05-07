$(document).ready(function() {
    var checkDataProgress = function() {
        var dataComplete = true;
        $('#metaDataForm :input').each(function(idx, val) {
            if ($(val).val() == "") dataComplete = false;
        }); 
        if (dataComplete)
            $('#comboDataProgress > span').css({'color': 'green'})
                                          .text('Complete!');
        else
            $('#comboDataProgress > span').css({'color': 'red'})
                                          .text('INCOMPLETE');
    };

    $('#metaDataForm :input').change(function() {
        checkDataProgress();
    });

    checkInputProgress = function() {
        if ($('#moves').children().length > 0)
            $('#moveInputProgress > span').css({'color': 'green'})
                                          .text('Complete!');
        else
            $('#moveInputProgress > span').css({'color': 'red'})
                                          .text('INCOMPLETE');
    };

    $('#moves').bind('DOMNodeInserted DOMNodeRemoved DOMSubtreeModified', function() {
        checkInputProgress();
    });

	$('#inputCarousel').carousel({
		interval: false,
	}).on('slid', function() {
		$('.stage').removeClass('active');
		if ($('#inputCarouselInner').children(':first').hasClass('active')) {
			$('.carousel-control.left').hide();
			$('.carousel-control.right').show();
			//$("#step1complete").html("INCOMPLETE").css({'color':'red'});
			//$("#step2complete").html("Completed!").css({'color':'green'});
			$('#comboDataProgress').addClass('active');
		} else if ($('#inputCarouselInner').children(':last').hasClass('active')) {
			$('.carousel-control.left').show();
			$('.carousel-control.right').hide();
			//$("#step1complete").html("Completed!").css({'color':'green'});
			//$("#step2complete").html("Completed!").css({'color':'green'});
			$('#confirmationProgress').addClass('active');
		} else {
			$('.carousel-control.left').show();
			$('.carousel-control.right').show();
			//$("#step1complete").html("Completed!").css({'color':'green'});
			//$("#step2complete").html("INCOMPLETE").css({'color':'red'});
			$('#moveInputProgress').addClass('active');
		}
	});
	
	// initialized to first slide
	$('.carousel-control.left').hide();
	
	$('#comboDataProgress').click(function() {
		$('#inputCarousel').carousel(0);
	});
	$('#moveInputProgress').click(function() {
		$('#inputCarousel').carousel(1);
	});
	$('#confirmationProgress').click(function() {
		$('#inputCarousel').carousel(2);
	});
	
	
	
	// combo data
	$('#charSelect').change(function() {
		var firstName = $('#charSelect').val().split(' ')[0].toLowerCase();
		loadNewCharImg(firstName);
	});
	
	
	var loadNewCharImg = function(firstName) {
		// snippet taken from http://jqueryfordesigners.com/image-loading/
		$('#charImg').addClass('loading').append('<i class="icon-spinner icon-spin">');
		var img = new Image();
		$(img)
			.load(function () {
				$(this).hide();
			$('#charImg')
			.removeClass('loading')
			.empty()
			.css('background-image', 'url("/static/img/characters/' + firstName + '_full.png")');
		  $(this).fadeIn();
		})
		.error(function () {
		})
		 .attr('src', '/static/img/characters/' + firstName + '_full.png');
	}
	
	// gamepad
	var gp = new Gamepad();
	$('#container-gamepad').append(gp);
	
		
	$('.loading').remove();
	

    $('#submitCombo').click(function() {
		var intRegex = /[1-9]/;
	    var letterRegex = /[A-D]/;
        var combo_input = [];

        $('#moves .moveText').each(function(idx, value) {
            var joystick = '';
            var buttons = '';

            var txt = $(value).text().trim().split(''); 
            var letterIdx = 0;
            // get numbers
            $.each(txt, function(i, v) {
              if (intRegex.test(v)) {
                joystick += v.toString();
              } else {
                letterIdx = i;
                return false //break;
              }
            });

            // get letters
            $.each(txt.splice(letterIdx), function(i, v) {
               if (letterRegex.test(v)) {
                buttons += v.toString();
              } else {
                return false //break;
              }
           
            });
            combo_input.push(joystick);
            combo_input.push(buttons);
        });

        var data = {
          'combo_input': JSON.stringify(combo_input),
        }

        $('#metaDataForm :input').each(function(i,v) {
          data[$(v).attr('name')] = $(v).val();
        });

        data['difficulty'] = $('#fireRating .icon-star').length;
       $.ajax({
          method: 'POST',
          url: '/p4u/submitCombo/',
          data: data,
          dataType: 'json',
          success: function(data) {
			// data.redirect contains the string URL to redirect to
			if (data.redirect) {
				console.log(data.redirect);
				window.location.href = data.redirect;
			} else {
				console.log(data);
			}
          },
        }).error(function(data) {
          console.log(data.responseText);
        });
    });    
});

// Django magic
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
