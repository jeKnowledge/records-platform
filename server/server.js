Meteor.methods({
 newMeeting: function (addName, addDate, addTime, addSubject) {
  Meetings.insert({ name: addName, date: addDate, time: addTime, subject: addSubject});
 }
});