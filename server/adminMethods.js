function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
} 

Meteor.methods({
  'addMember': function (member_name, member_email, member_department) {
    if (!member_name) {
      throw new Meteor.Error(411, 'Member name is too small.');
    }

    if (!validateEmail(member_email)) {
      throw new Meteor.Error(400, 'Email is not valid.');
    }
    
    Members.insert({ name: member_name, email: member_email, department: member_department });
  }
});
