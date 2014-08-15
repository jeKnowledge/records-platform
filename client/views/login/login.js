Template.signupForm.events({
  'submit #signup-form': function (event, template) {
    event.preventDefault();

    var username = $('#signup-username').val();
    var password = $('#signup-password').val(); 
    var email = $('#signup-email').val();
    var department = $('#signup-department').val();

    Meteor.call('createNewUser', username, password, email, department, function (error) {
      if (error) {
        displayMessage2('alert-danger', error);
      } else {
        displayMessage2('alert-success', 'Utilizador criado com sucesso.');
        $('#signup-username').val('');
        $('#signup-password').val('');
        $('#signup-email').val('');
      }
    });
  }
});

Template.loginForm.events({
  'submit #login-form': function (event, template) {
    event.preventDefault();

    Meteor.loginWithPassword(
      $('#login-username').val(),
      $('#login-password').val(),

      function (error) {
        if (error) {
          consoe.log('An error occurred logging in: ' + error);
          $('#error-message').text(error);
        }
      }
    );
  }
});

Template.logoutForm.events({
  'click #logout-form': function (event, template) {
    event.preventDefault();

    Meteor.logout(function (error) {
      if (error) {
        console.log('An error occurred logging out: ' + error);
        $('#error-message').text(error);        
      }
    });
  }
});

Template.logoutForm.userName = function () {
  return Meteor.user().username;
};
