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
  }
})

