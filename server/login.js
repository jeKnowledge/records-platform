//Validate Email Function
function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

Meteor.methods({
  'createNewUser': function (username_g, password_g, name_g, email_g, department_g) {
    if (!username_g) {
      throw new Meteor.Error(411, 'Username is too small');
    }

    if (password_g.length < 4) {
      throw new Meteor.Error(411, 'Password is too small.');
    }

    if (!name) {
      throw new Meteor.Error(411, 'Name is too small.');
    }

    if (!validateEmail(email_g)) {
      throw new Meteor.Error(400, 'Email is not valid.');
    }

    if (department_g === 'empty') {
      throw new Meteor.Error(400, 'Department is not valid.');
    }

    Accounts.createUser({
      username: username_g,
      password: password_g,

      profile: {
        name: name_g,
        email: email_g,
        department: department_g
        // Other required field values can go here
      }
    });
  }
});
