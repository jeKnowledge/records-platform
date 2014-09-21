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

Template.meetings.meetings = function () {
  if (Session.get('meetingsLoaded') && Session.get('projectsLoaded') && Session.get('userDataLoaded')) {
    var array = Meetings.find({ members: Meteor.userId() }, { sort: {date: -1} }).fetch();
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
      newArray[i].project = Projects.find({ _id: array[i].project}).fetch()[0].name;

      for (var j = 0; j < newArray[i].members.length; j++) {
        newArray[i].members[j] = Meteor.users.find({ _id: newArray[i].members[j] }).fetch()[0].profile.name;
      };
    };

    return newArray;
  } else {
    return [];
  }
}

Template.meetings.events({
  'click .meetings-table-delete-button': function (evt, tmpl) {
    var delete_id = this._id;

    Meteor.call('deleteMeeting', delete_id, function (error) {
      if (error) {
        displayAlert('#meetings-alert', 'alert-danger', error);
      } else {
        displayAlert('#meetings-alert', 'alert-success', 'Reunião eliminada com sucesso.');

        //Send email notification
      }
    })
  }
})
