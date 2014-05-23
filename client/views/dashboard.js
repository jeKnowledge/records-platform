Template.dashboard.meetings = function () {
 return Meetings.find({});
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
 }		
});