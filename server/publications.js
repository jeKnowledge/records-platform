Meteor.publish('meetings', function() {
  return Meetings.find({ });
});

Meteor.publish ('directory', function() {
  return Meteor.users.find({ }, { fields: { emails: 1, profile: 1 } });
});
