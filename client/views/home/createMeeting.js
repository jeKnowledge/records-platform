Template.createMeeting.rendered = function () {
  $('#add-meeting-alert').hide();
}

Template.createMeeting.projects = function () {
  return Projects.find({ });
}

Template.createMeeting.members = function () {
  return Meteor.users.find({ });
}

Template.createMeeting.events({
  'click #submit-new-meeting-form': function (evt, tmpl) {
    var project = $('#new-meeting-project option:selected').attr('name');
    var date = $('#new-meeting-date').val();
    var time = $('#new-meeting-time').val();
    var department = $('#new-meeting-department').val();  
    var description = $('#new-meeting-description').val();
    var members = [];

    //Get Member's IDs
    var temp = $('.panel-body').find('p');
    for (var i = 0; i < temp.length; i++) {
      if ($(temp[i]).find('input').is(':checked')) {
        members[members.length] = $(temp[i]).attr('name');
      }
    };

    Meteor.call('addMeeting', project, date, time, department, description, members, function (error) {
      if (error) {
        displayAlert('#add-meeting-alert', 'alert-danger', error);
      } else {
        displayAlert('#add-meeting-alert', 'alert-success', 'Reunião marcada com sucesso.');
        $('#new-meeting-date').val('');
        $('#new-meeting-time').val('');
        $('#new-meeting-description').val('');

        //Send email notification
      }
    });
  }
})

