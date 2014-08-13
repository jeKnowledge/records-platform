Meteor.publish('atas', function () {
  return Atas.find({ });
});

Meteor.publish('members', function () {
  return Members.find({ });
});
