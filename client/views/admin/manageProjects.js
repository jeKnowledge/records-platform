Template.manageProjects.rendered = function () {
  $('#manage-projects-alert').hide();
}

Template.manageProjects.events({
  'click #submit_project': function (evt, tmpl) {
    evt.preventDefault();          

    var name = $('#project-name').val();
    var department = $('#project-department').val();

    Meteor.call('addProject', name, department, function (error) {
      if (error) {
        displayAlert('#manage-projects-alert', 'alert-danger', error);
        $('#manage-projects-alert').addClass('form-element');
      } else {
        displayAlert('#manage-projects-alert', 'alert-success', 'Projeto adicionado com sucesso.');
        $('#manage-projects-alert').addClass('form-element');        
        $('project-name').val('');
      }
    })
  }
})
