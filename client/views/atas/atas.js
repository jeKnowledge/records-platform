Template.atas.rendered = function () {
  $('#atas-alert').hide();
}

Template.atas.atass = function () {
  if (Session.get('meetingsLoaded') && Session.get('projectsLoaded') && Session.get('userDataLoaded')) {
    var array = Atas.find({ members: Meteor.userId() }, { sort: { date: -1 } }).fetch();
    var newArray = [];
    
    for (var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
      newArray[i].title = Projects.find({ _id: Meetings.find({ _id: array[i].meeting }).fetch()[0].project }).fetch()[0].name;
      newArray[i].content = array[i].content.slice(0, 60);
      newArray[i].date = Meetings.find({ _id: array[i].meeting }).fetch()[0].date;

      for (var j = 0; j < array[i].members.length; j++) {
        newArray[i].members[j] = Meteor.users.find({ _id: array[i].members[j] }).fetch()[0].profile.name;
      };
    };

    return newArray;
  } else {
    return [];
  }
}

Template.atas.events({
  'click .atas-table-delete-button': function (evt, tmpl) {
    var ataID = this._id;
    var meetingID = this.meeting;

    Meteor.call('deleteAta', ataID, meetingID, function (error) {
      if (error) {
        displayAlert('#ata-alert', 'alert-danger', error);
      } else {
        displayAlert('#ata-alert', 'alert-success', 'Ata eliminada com sucesso.');
      }
    });
  },
  'click .atas-table-pdf-download': function (evt, tmpl) {
    generatePDF(this._id);

    displayAlert('#ata-alert', 'alert-success', 'PDF gerado com sucesso.');
  },
  'click .atas-table-info-modal': function (evt, tmpl) {
    console.log('fas')
    Session.set('current_ata', this._id);
    Session.set('ai_project', this.title);
    Session.set('ai_date', this.date);
    Session.set('ai_content', this.content);

    var array = [];;
    for (var i = 0; i < this.members.length; i++) {
      array[i] = { profile: { name: '' } };
      array[i].profile.name = this.members[i]
    };
    Session.set('ai_members', array);  

    //Show Modal
    $('#ata-info').modal('show');
  }
})
