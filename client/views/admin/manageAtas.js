Template.manageProjects.events({
  'click #submit_project': function (evt, tmpl) {
    evt.preventDefault();          

    var name = $('#project-name').val();
    var department = $('#project-department').val();

    Meteor.call('addProject', name, department, function (error) {
      if (error) {
        //Show error
        console.log(error);
      } else {
        //Show success
        console.log('Adicionado com sucesso à bd');
      }
    })
  }
})
