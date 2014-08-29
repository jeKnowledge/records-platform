Meteor.methods({
  'addProject': function (project_name, project_department) {
    if (!project_name) {
      throw new Meteor.Error(411, 'Project name is too small');
    }

    Projects.insert({ name: project_name, department: project_department }); 
  }
});
