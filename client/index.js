Meteor.subscribe('atas');

Meteor.subscribe('meetings');

Meteor.subscribe('projects');

displayAlert = function (which, type, message) {
  $(which + '-text').text(message);

  $(which).show();
  $(which).removeAttr('class')
  $(which).addClass('alert');
  $(which).addClass(type);
}
