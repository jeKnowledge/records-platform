Template.dashboard.meetings = function () {
 return Meetings.find({});
};

Template.dashboard.selectedMeetingName = function() {
 var meeting = Meetings.findOne(Session.get('selectedMeeting'));
 return meeting && meeting.name;
};

Template.dashboard.rendered = function() {
 var allMeetings = Meetings.find({ }).fetch();
 if (allMeetings.lentgh > 0) {
  Session.set('selectedMeeting', allMeetings[0]._id)
 }
};

Template.dashboard.events({
 'click #new-meeting-btn': function() {
  var addName =$ ('#add-meeting-name-input').val(); 
  var addDate =$ ('#add-meeting-date-input').val();
  var addTime =$ ('#add-meeting-time-input').val();
  var addSubject =$ ('#add-meeting-subject-input').val();

  Meteor.call('newMeeting', addName, addDate, addTime, addSubject, function(error) {
   if (error) {
    console.log(error);
   }
  });
 },

 'click #add-meeting-record-btn': function() {
  console.log("CENAS");
  var addRecordinfo =$ ('#add-meeting-record-input').val();
  var selectedMeetingName =$ ('#meeting-select').val();
  var selectedMeeting = Meetings.findOne({ name: selectedMeetingName });

  Meteor.call('addRecord', addRecordinfo, selectedMeeting._id, function(error) {
   if (error) {
    console.log(error);
   }
  });
 },

 'change #meeting-select': function () {
  var selectedMeetingName =$ ('#meeting-select').val();
  var selectedMeeting = Meetings.findOne({ name: selectedMeetingName });
  Session.set('selectedMeeting', selectedMeeting._id);
 }
});