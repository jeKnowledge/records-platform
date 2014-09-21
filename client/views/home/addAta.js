Template.addAta.rendered = function () {
  Session.set('selectedMeeting', 'empty');
  $('#add-ata-alert').hide();
}

Template.addAta.meetings = function () {
  if (Session.get('meetingsLoaded') && Session.get('projectsLoaded')) {
    var searchMeetings = Meetings.find({ members: Meteor.userId(), date: {$lte: currentDate()}, ata: 0}).fetch();

    for (var i = 0; i < searchMeetings.length; i++) {
      searchMeetings[i].project = Projects.find({ _id: searchMeetings[i].project }).fetch()[0].name;
    };

    return searchMeetings;
  } else {
    return []; 
  }
}

Template.addAta.members = function () {
  if (Session.get('meetingsLoaded') && Session.get('userDataLoaded')) {  
    var selectedMeeting = Session.get('selectedMeeting');

    if (selectedMeeting === 'empty') {
      return [];
    } else {
      var array = Meetings.find({ _id: selectedMeeting }).fetch()[0].members;
      var newArray = [];

      for (var i = 0; i < array.length; i++) {
        newArray[newArray.length] = Meteor.users.find({ _id: array[i] }).fetch()[0];
      };

      return newArray;
    }
  } else {
    return [];
  }
}

Template.addAta.events({
  'change #meeting-selector': function (evt, tmpl) {
    Session.set('selectedMeeting', $('#meeting-selector option:selected').attr('name'));
  },
'click #submit-new-ata-form': function (evt, tmpl) {
  var meeting = $('#meeting-selector option:selected').attr('name');
  var content = $('#ata-content').val();
  var members = [];

  //Get Member's IDs
  var temp = $('#panel-body-ata').find('p');
  for (var i = 0; i < temp.length; i++) {
    if ($(temp[i]).find('input').is(':checked')) {
      members[members.length] = $(temp[i]).attr('name');
    }
  };

  Meteor.call('addAta', meeting, content, members, function (error) {
    if (error) {
      displayAlert('#add-ata-alert', 'alert-danger', error);        
    } else {
      displayAlert('#add-ata-alert', 'alert-success', 'Ata adicionada com sucesso.');
      $('#meeting-selector').val('Reunião');
      $('#ata-content').val('');
    }
  });

  Meteor.call('addAtaToMeeting', meeting);
}
})
