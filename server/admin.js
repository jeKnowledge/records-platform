Meteor.methods({
  'addProject': function (project_name, project_department) {
    if (!project_name) {
      throw new Meteor.Error(411, 'Project name is too small.');
    }

    if (project_department === 'empty') {
      throw new Meteor.Error(400, 'Project department is invalid.');
    }

    Projects.insert({ name: project_name,
                      department: project_department,
                      state: 'Em execução'}); 
  },
  'deleteProject': function (project_id) {
    Projects.remove({ _id: project_id });
  },
  'updateProject': function (project_id, project_name, project_department, project_state) {
    if (!project_name) {
      throw new Meteor.Error(411, 'Project name is too small.');
    }

    if (project_department === 'empty') {
      throw new Meteor.Error(400, 'Project department is invalid.');
    }

    if (project_state === 'empty') {
      throw new Meteor.Error(400, 'Project state is invalid.');
    }

    Projects.update({ _id: project_id }, { name: project_name,
                                           department: project_department,
                                           state: project_state});
  },
  'updateAta': function (ata_id, ata_content) {
    if (!ata_content) {
      throw new Meteor.Error(411, 'Ata content is too small.');
    }

    Atas.update({ _id: ata_id }, { $set: { content: ata_content } });
  }
});
