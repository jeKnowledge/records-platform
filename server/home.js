currentDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd < 10) {
    dd='0'+dd
  } 

  if(mm < 10) {
    mm='0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today; 
}

Meteor.methods({
  'addMeeting': function (project_m, date_m, time_m, departmen_m, description_m, members_g) {
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

    if (members_g.length < 2) {
      throw new Meteor.Error(411, 'The meeting should have ate least 2 members assigned.');
    }

    Meetings.insert({ project: project_m,
                      date: date_m,
                      time: time_m,
                      department: departmen_m,
                      description: description_m,
                      members: members_g, 
                      ata: 0 });
  },
  'deleteMeeting': function (delete_id) {
    Meetings.remove({ _id: delete_id });
    Atas.remove({ meeting: delete_id });
  }, 
  'addAta': function (ata_meeting, ata_content, ata_members) {
    if (ata_meeting === 'empty') {
      throw new Meteor.Error(400, 'Meeting is not valid.');
    }

    if (!ata_content) {
      throw new Meteor.Error(411, 'Meeting content is too small.');
    }

    if (ata_members.length < 2) {
      throw new Meteor.Error(411, 'The meeting should have ate least 2 members assigned.');
    }

    Atas.insert({ meeting: ata_meeting,
                  date: currentDate(),
                  content: ata_content,
                  members: ata_members });
  },
  'addAtaToMeeting': function (meeting_id) {
    Meetings.update({ _id: meeting_id }, { $inc: { 'ata': 1 } });
  }
})
