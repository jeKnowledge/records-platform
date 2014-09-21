Meteor.startup(function () {
  Session.set('atasLoaded', false);
  Session.set('meetingsLoaded', false);
  Session.set('projectsLoaded', false);
  Session.set('userDataLoaded', false);

  Session.set('selectedMeeting', 'empty');

}); 

Meteor.subscribe('atas', function () {
  Session.set('atasLoaded', true);
});

Meteor.subscribe('meetings', function () {
  Session.set('meetingsLoaded', true);
});

Meteor.subscribe('projects', function () {
  Session.set('projectsLoaded', true);
});

Meteor.subscribe('userData', function () {
  Session.set('userDataLoaded', true);
});

/* General Functions */

//Display Alert Function
displayAlert = function (which, type, message) {
  $(which + '-text').text(message);

  $(which).show();
  $(which).removeAttr('class')
  $(which).addClass('alert');
  $(which).addClass(type);
}

//Get Current Date Function
currentDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd < 10) {
    dd='0'+dd
  } 

  if(mm < 10) {
    mm='0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today; 
}
