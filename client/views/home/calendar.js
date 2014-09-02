Template.calendar.helpers({
  project: function () {
    return Session.get('mi_project');
  },
  date: function () {
    return Session.get('mi_date');
  },
  time: function () {
    return Session.get('mi_time');
  },
  department: function () {
    return Session.get('mi_department');
  },
  description: function () {
    return Session.get('mi_description');
  },
  members: function () {
    return Session.get('mi_members');
  }
})

Template.calendar.rendered = function () {
  Meteor.call('generateEvents', function (error, data) {
    if (error) {
      //Dislpay error
    } else {
      $('#calendar').fullCalendar({
        events: data,
        
        eventClick: function(calEvent, jsEvent, view) {
          event_f = Meetings.find({ _id: calEvent.db_id }).fetch()[0];

          Session.set('current_meeting', calEvent.db_id);
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
      });
    }
  });

  $('#meeting-info-alert').hide();
}

Template.calendar.events({
  'click #delete-meeting': function (evt, tmpl) {
    var delete_id = Session.get('current_meeting');

    Meteor.call('deleteMeeting', delete_id, function (error) {
      if (error) {
        displayAlert('#meeting-info-alert', 'alert-danger', error);
      } else {
        displayAlert('#meeting-info-alert', 'alert-success', 'Reunião eliminada com sucesso.');
        $('#meeting-info').modal('hide');

        //Send email notification
      }
    })
  }
})


