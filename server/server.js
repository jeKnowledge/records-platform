Meteor.methods({
 newMeeting: function (addName, addDate, addTime, addSubject) {
  Meetings.insert({ name: addName, date: addDate, time: addTime, subject: addSubject, record:[]});
 },

 addRecord: function (addRecord,meeting_id) {
  Meetings.update(meeting_id,{$addToSet:{record: {text :addRecord}}});
 }

});