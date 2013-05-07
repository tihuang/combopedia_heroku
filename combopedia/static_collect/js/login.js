$(document).ready(function() {
	$('#loginForm').modal({show: false});

	$('#loginForm').submit(function(e) {
		e.preventDefault();
        var values = {};
        $.each($('#loginForm').serializeArray(), function(i, field) {
              values[field.name] = field.value;
        });
        var result;
        $.ajax({
          method: 'POST',
          url: '/login/',
          data: values,
          success: function() {
            $('#login_error').text('');
            $('#loginModal').modal('hide');
            result = true;
            location.reload();
          },
        }).error(function() {
          console.log('error');
          $('#loginModal').modal('show');
          $('#login_error').text('Incorrect username or password');
          result = false;
        });
	});
	
    $('#existing_login').submit(function(e) {
        e.preventDefault();
        var values = {};
        $.each($('#existing_login').serializeArray(), function(i, field) {
              values[field.name] = field.value;
        });
        var result;
        $.ajax({
          method: 'POST',
          url: '/login/',
          data: values,
          success: function() {
            $('#login_error').text('');
            $('#loginModal').modal('hide');
            result = true;
            location.reload();
          },
        }).error(function() {
          console.log('error');
          $('#loginModal').modal('show');
          $('#login_error').text('Incorrect username or password');
          result = false;
        });
    });


    $('#signup').submit(function(e) {
        e.preventDefault();
        var values = {};
        $.each($('#signup').serializeArray(), function(i, field) {
              values[field.name] = field.value;
        });
        $.ajax({
          method: 'POST',
          url: '/signup/',
          data: values,
          success: function() {
            $('#signup_error').text('');
            $('#loginModal').modal('hide');
            location.reload();
          },
        }).error(function() {
          console.log('error');
          $('#signup_error').text('Username already exists');
        });
    });

});
