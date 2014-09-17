var currentDate = function () {
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

Template.sideBar.meetings = function () {
  if (Session.get('meetingsLoaded') && Session.get('projectsLoaded')) {
    var array = Meetings.find({ members: Meteor.userId(), date: {$gte: currentDate()} }, { sort: {date: 1} }).fetch();
    var newArray = [];

    if (array.length != 0) {
      if (array.length > 3) {
        for (var i = 0; i < 3; i++) {
          newArray[i] = array[i];
          newArray[i].project = Projects.find({ _id: array[i].project}).fetch()[0].name;
        };

        return newArray;
      } else { //array.length < 3
        for (var i = 0; i < array.length; i++) {
          newArray[i] = array[i];          
          newArray[i].project = Projects.find({ _id: array[i].project}).fetch()[0].name;
        };

        return newArray;         
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

Template.sideBar.atas = function () {
  if (Session.get('atasLoaded') && Session.get('projectsLoaded')) {
    var array = Atas.find({ members: Meteor.userId() }).fetch();
    var newArray = [];

    if (array.length != 0) {
      if (array.length > 3) {
        for (var i = 0; i < 3; i++) {
          newArray[i] = array[i];          
          newArray[i].title = Projects.find({ _id: Meetings.find({ _id: array[i].meeting }).fetch()[0].project }).fetch()[0].name;
          newArray[i].date = Meetings.find({ _id: array[i].meeting }).fetch()[0].date;
          newArray[i].time = Meetings.find({ _id: array[i].meeting }).fetch()[0].time;                
        };

        return newArray;
      } else { //array.length < 3
        for (var i = 0; i < array.length; i++) {
          newArray[i] = array[i];          
          newArray[i].title = Projects.find({ _id: Meetings.find({ _id: array[i].meeting }).fetch()[0].project }).fetch()[0].name;
          newArray[i].date = Meetings.find({ _id: array[i].meeting }).fetch()[0].date;
          newArray[i].time = Meetings.find({ _id: array[i].meeting }).fetch()[0].time;          
        };

        return newArray;         
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
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
