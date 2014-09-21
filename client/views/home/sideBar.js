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
      return newArray;
    }
  } else {
    return newArray;
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
      return newArray;
    }
  } else {
    return newArray;
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
  },
'click .ata-list-item': function (evt, tmpl) {
  var meeting = Meetings.find({ _id: this.meeting }).fetch()[0];

  Session.set('current_ata', this._id);
  Session.set('ai_project', Projects.find({ _id: meeting.project }).fetch()[0].name);
  Session.set('ai_date', this.date);
  Session.set('ai_content', this.content);

  var array = [];
  for (var i = 0; i < this.members.length; i++) {
    array[i] = Meteor.users.find({ _id: this.members[i] }).fetch()[0];
  };
  Session.set('ai_members', array);    

  //Show Modal
  $('#ata-info').modal('show');     
} 
})
