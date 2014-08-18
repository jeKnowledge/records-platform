Template.createMeeting.projects = function () {
  return Projects.find({ });
}

Template.createMeeting.events({
  'click #submit-new-meeting-form': function (evt, tmpl) {
    var project = $('#new-meeting-project option:selected').attr('name');
    var date = $('#new-meeting-date').val();
    var time = $('#new-meeting-time').val();
    var department = $('#new-meeting-department').val();  
    var description = $('#new-meeting-description').val();

    Meteor.call('addMeeting', project, date, time, department, description, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Inserido com sucesso na bd.');
      }
    });
  }
})

