Template.manageProjects.rendered = function () {
  $('#manage-projects-alert').hide();
}

Template.manageProjects.projetos = function () {
  return Projects.find({ });
}

Template.manageProjects.events({
  'click #submit-project': function (evt, tmpl) {
    evt.preventDefault();          

    var name = $('#project-name').val();
    var department = $('#project-department option:selected').attr('name');

    Meteor.call('addProject', name, department, function (error) {
      if (error) {
        displayAlert('#manage-projects-alert', 'alert-danger', error);
        $('#manage-projects-alert').addClass('form-element');
      } else {
        displayAlert('#manage-projects-alert', 'alert-success', 'Projeto adicionado com sucesso.');
        $('#manage-projects-alert').addClass('form-element');        
        $('#project-name').val('');
        $('#project-department').val('Departamento');
      }
    })
  },
  'change #manage-project-selector': function (evt, tmpl) {
    var selectedProject = $('#manage-project-selector option:selected').attr('name');

    if (selectedProject === 'empty') {
      $('#manage-project-name').val('');
      $('#manage-project-department').val('Departamento');
      $('#manage-project-state').val('Estado');
    } else {
      var searchProject = Projects.find({ _id: selectedProject }).fetch()[0];
      $('#manage-project-name').val(searchProject.name);
      console.log(searchProject.department);
      $('#manage-project-department').val(searchProject.department);
      $('#manage-project-state').val(searchProject.state);
    }
  },
  'click #manage-project-update-button': function (evt, tmpl) {
    var selectedProject = $('#manage-project-selector option:selected').attr('name');

    var name = $('#manage-project-name').val();
    var department = $('#manage-project-department option:selected').attr('name');
    var state = $('#manage-project-state option:selected').attr('name');
    
    Meteor.call('updateProject', selectedProject, name, department, state, function (error) {
      if (error) {
        displayAlert('#manage-projects-alert', 'alert-danger', error);
        $('#manage-projects-alert').addClass('form-element');                
      } else {
        displayAlert('#manage-projects-alert', 'alert-success', 'Projeto atualizado.');   
        $('#manage-projects-alert').addClass('form-element');                
      }
    });
  },
  'click #manage-project-delete-button': function (evt, tmpl) {
    var selectedProject = $('#manage-project-selector option:selected').attr('name');

    Meteor.call('deleteProject', selectedProject);
    displayAlert('#manage-projects-alert', 'alert-success', 'Projeto eliminado.');   
    $('#manage-projects-alert').addClass('form-element');
    $('#manage-project-name').val('');
    $('#manage-project-department').val('Departamento');
    $('#manage-project-department').val('Estado');
  }
})
