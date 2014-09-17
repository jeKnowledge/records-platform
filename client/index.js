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

displayAlert = function (which, type, message) {
  $(which + '-text').text(message);

  $(which).show();
  $(which).removeAttr('class')
  $(which).addClass('alert');
  $(which).addClass(type);
}
