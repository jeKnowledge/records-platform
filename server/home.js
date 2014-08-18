Meteor.methods({
  'addMeeting': function (project_m, date_m, time_m, departmen_m, description_m) {
    if (project_m === 'empty') {
      throw new Meteor.Error(400, 'Project is not valid.');
    }

    if (!moment(date_m, ["YYYY-MM-DD"]).isValid()) {
      throw new Meteor.Error(400, 'Date is not valid.');
    }

    if (!moment(time_m, ["HH-MM"]).isValid()) {
      throw new Meteor.Error(400, 'Time is not valid.');
    }

    if (departmen_m === 'empty') {
      throw new Meteor.Error(400, 'Departament is not valid.')
    }

    Meetings.insert({ project: project_m,
                      date: date_m,
                      time: time_m,
                      department: departmen_m,
                      description: description_m })
  }
})
