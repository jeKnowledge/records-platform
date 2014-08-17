Meteor.publish('atas', function () {
  return Atas.find({ });
});

Meteor.publish('meetings', function () {
  return Meetings.find({ });
});
