Template.signupForm.rendered = function () {
  $('#manage-users-alert').hide();
}

Template.signupForm.events({
  'submit #signup-form': function (event, template) {
    event.preventDefault();

    var username = $('#signup-username').val();
    var password = $('#signup-password').val();
    var name = $('#signup-name').val();    
    var email = $('#signup-email').val();
    var department = $('#signup-department option:selected').attr('name');

    Meteor.call('createNewUser', username, password, name, email, department, function (error) {
      if (error) {
        displayAlert('#manage-users-alert', 'alert-danger', error);
        $('#manage-users-alert').addClass('form-element');        
      } else {
        displayAlert('#manage-users-alert', 'alert-success', 'Utilizador criado com sucesso.');
        $('#manage-users-alert').addClass('form-element');                
        $('#signup-username').val('');
        $('#signup-password').val('');
        $('#signup-name').val('');
        $('#signup-email').val('');
        $('#signup-department').val('Departamento');
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
          console.log('An error occurred logging in: ' + error);
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
      }
    });
  }
});

Template.logoutForm.userName = function () {
  return Meteor.user().username;
};
