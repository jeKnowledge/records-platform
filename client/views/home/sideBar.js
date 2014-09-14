var currentDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today; 
}

Template.sideBar.meetings = function () {
  var array = Meetings.find({ members: Meteor.userId(), date: {$gte: currentDate()} }, { sort: {date: 1} }).fetch();

  for (var i = 0; i < array.length; i++) {
    array[i].project = Projects.find({ _id: array[i].project}).fetch()[0].name;
  };

  return array;
}

Template.sideBar.events({
  'click .meeting-list-item': function (evt, tmpl) {
    event_f = Meetings.find({ _id: this._id }).fetch()[0];

    Session.set('current_meeting', this._id);
    Session.set('mi_project', Projects.find({ _id: event_f.project }).fetch()[0].name);
    Session.set('mi_date', event_f.date);
    Session.set('mi_time', event_f.time);
    Session.set('mi_department', event_f.department);
    Session.set('mi_description', event_f.description);

    var array = [];
    for (var i = 0; i < event_f.members.length; i++) {
      array[array.length] = Meteor.users.find({ _id: event_f.members[i] }).fetch()[0];
    };
    Session.set('mi_members', array);
   
    //Show Modal
    $('#meeting-info').modal('show'); 
  }
})
