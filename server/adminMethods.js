//function to check if email is valid

Meteor.methods({
  'addMember': function (member_name, member_email, member_department) {
    if (!member_name) {
      throw new Meteor.Error(411, 'Member name is too small.');
    }

    //use functio to check if email is valid 
    if (false) {
      throw new Meteor.Error(400, 'Email is not valid.');
    }
    
    Members.insert({ name: member_name, email: member_email, department: member_department });
  }
});
