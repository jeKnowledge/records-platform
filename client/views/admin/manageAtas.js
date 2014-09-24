Template.manageAtas.rendered = function () {
  $('#manage-atas-alert').hide();
}

Template.manageAtas.atas = function () {
  if (Session.get('meetingsLoaded') && Session.get('projectsLoaded')) {
    var searchAtas = Atas.find({ }).fetch();

    for (var i = 0; i < searchAtas.length; i++) {
      searchAtas[i].meeting = Projects.find({ _id: Meetings.find({ _id:  searchAtas[i].meeting }).fetch()[0].project }).fetch()[0].name;
    };

    return searchAtas;
  } else {
    return [];
  }
}

Template.manageAtas.events({
  'change #manage-atas-selector': function (evt, tmpl) {
    var selectedAtaID = $('#manage-atas-selector option:selected').attr('name');
    if (selectedAtaID === 'empty') {
      $('#manage-atas-content').val('');    
    } else {
      var selectedAta = Atas.find({ _id: selectedAtaID }).fetch()[0];

      $('#manage-atas-content').val(selectedAta.content);
    }
  },
  'click #manage-atas-update-button': function (evt, tmpl) {
    var selectedAtaID = $('#manage-atas-selector option:selected').attr('name');
    var selectedAtaContent = $('#manage-atas-content').val();
    if (selectedAtaID === 'empty') {
      displayAlert('#manage-atas-alert', 'alert-danger', 'Escolha uma ata porfavor.');
    } else {
      Meteor.call('updateAta', selectedAtaID, selectedAtaContent, function (error) {
        if (error) {
          displayAlert('#manage-atas-alert', 'alert-danger', error);          
        } else {
          displayAlert('#manage-atas-alert', 'alert-success', 'Ata atualizada com sucesso');          
        }
      });
    }
  },
  'click #manage-atas-delete-button': function (evt, tmpl) {
    var selectedAtaID = $('#manage-atas-selector option:selected').attr('name');
    var meetingID = Atas.find({ _id: selectedAtaID }).fetch()[0].meeting;
    if (selectedAtaID === 'empty') {
      displayAlert('#manage-atas-alert', 'alert-danger', 'Escolha uma ata porfavor.');
    } else {
      Meteor.call('deleteAta', selectedAtaID, meetingID, function (error) {
        if (error) {
          displayAlert('#manage-atas-alert', 'alert-danger', error);          
        } else {
          displayAlert('#manage-atas-alert', 'alert-success', 'Ata eliminada com sucesso');
          $('#manage-atas-content').val('');
          $('#manage-atas-selector').val('Escolha uma ata.');    
        }
      });
    }
  },
  'click #manage-atas-pdf-button': function (evt, tmpl) {
    var selectedAtaID = $('#manage-atas-selector option:selected').attr('name');    
    generatePDF(selectedAtaID);
    
    displayAlert('#manage-atas-alert', 'alert-success', 'PDF gerado com sucesso.');    
  }
})
