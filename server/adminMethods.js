function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
} 

Meteor.methods({
  'addmember': function (member_name, member_email, member_department) {
    if (!member_name) {
      throw new Meteor.Error(411, 'Member name is too small.');
    }

    if (!validateEmail(member_email)) {
      throw new Meteor.Error(400, 'Email is not valid.');
    }
    
    Members.insert({ name: member_name, email: member_email, department: member_department });
  },
  'updatemember': function (member_id, member_name, member_email, member_department) {
    if (!member_name) {
      throw new Meteor.Error(411, 'Member name is too small.');
    }

    if (!validateEmail(member_email)) {
      throw new Meteor.Error(400, 'Email is not valid.');
    }

    Members.update({ _id: member_id},
                   { name: member_name, email: member_email, department: member_department});
  },
  'deletemember': function (member_id) {
    Members.remove({ _id: member_id }, function (error) {
      if (error) {
        throw new Meteor.Error(500, error);
      }
    })
  },
  'createNewUser': function (username_g, password_g, email_g, department_g) {
    if (!username_g) {
      throw new Meteor.Error(411, 'Username is too small');
    }

    if (password_g.length < 4) {
      throw new Meteor.Error(411, 'Password is too small.');
    }

    if (!validateEmail(email_g)) {
      throw new Meteor.Error(400, 'Email is not valid.');
    }

    Accounts.createUser({
      username: username_g,
      password: password_g,

      profile: {
        email: email_g,
        department: department_g
        // Other required field values can go here
      }
    });
  }
});
