Template.modals.rendered = function () {
  $('#ata-info-alert').hide();
}

Template.modals.helpers({
  a_project: function () {
    return Session.get('ai_project');
  },
  a_date: function () {
    return Session.get('ai_date');
  },
  a_content: function () {
    return Session.get('ai_content');
  },
  a_members: function () {
    return Session.get('ai_members');
  },
  m_project: function () {
    return Session.get('mi_project');
  },
  m_date: function () {
    return Session.get('mi_date');
  },
  m_time: function () {
    return Session.get('mi_time');
  },
  m_department: function () {
    return Session.get('mi_department');
  },
  m_description: function () {
    return Session.get('mi_description');
  },
  m_members: function () {
    return Session.get('mi_members');
  }
})

Template.modals.events({
  'click #delete-meeting': function (evt, tmpl) {
    var delete_id = Session.get('current_meeting');

    Meteor.call('deleteMeeting', delete_id, function (error) {
      if (error) {
        displayAlert('#meeting-info-alert', 'alert-danger', error);
      } else {
        displayAlert('#meeting-info-alert', 'alert-success', 'Reunião eliminada com sucesso.');
        $('#meeting-info').modal('hide');

        //Send email notification
      }
    })
  },
  'click #delete-ata': function (evt, tmpl) {
    var delete_id = Session.get('current_ata');
    var meeting_id = Atas.find({ _id: delete_id }).fetch()[0].meeting;

    Meteor.call('deleteAta', delete_id, meeting_id, function (error) {
      if (error) {
        displayAlert('#meeting-info-alert', 'alert-danger', error);
      } else {
        displayAlert('#meeting-info-alert', 'alert-success', 'Ata eliminada com sucesso.');
        $('#ata-info').modal('hide');

        //Send email notification
      }
    })
  },
  'click #download-pdf': function (evt, tmpl) {
    var searchAta = Atas.find({ _id: Session.get('current_ata') }).fetch()[0];
    searchAta.meeting = Projects.find({ _id: Meetings.find({ _id: searchAta.meeting }).fetch()[0].project }).fetch()[0].name;
    for (var i = 0; i < searchAta.members.length; i++) {
      searchAta.members[i] = Meteor.users.find({ _id: searchAta.members[i] }).fetch()[0].profile.name;
    };

    var doc = new jsPDF();

    doc.setFontSize(25);
    doc.text(30, 30, 'Ata ' + searchAta.meeting);

    doc.setFontSize(14);
    doc.text(30, 40, 'Data: ' + searchAta.date);

    doc.setFontSize(12);
    doc.text(30, 50, 'Membros presentes: ');
    doc.text(30, 55, searchAta.members);
    doc.text(30, 50 + (searchAta.members.length * 10), searchAta.content);
    

    var out = doc.output('datauristring');
    var x = window.open();
    x.document.open();
    x.document.location=out;

    displayAlert('#ata-info-alert', 'alert-success', 'PDF gerado com sucesso.');
  }
})

