var displayMessage = function (tipo, message) {
  $('#info-paragraph-text').text(message);

  $('#info-paragraph').show();
  $('#info-paragraph').removeClass();
  $('#info-paragraph').addClass('form-element');
  $('#info-paragraph').addClass('alert');
  $('#info-paragraph').addClass(tipo);
}

Template.newata.rendered = function () {
  //Iniciar Date Picker
  $('#ata-date').datepicker();

  //Hide Info Paragraph
  $('#info-paragraph').hide();
}

Template.newata.events({
  'submit #new-ata-form': function (evt, tmpl) {
    evt.preventDefault();
    var subject = $('#ata-subject').val();
    var date = $('#ata-date').val();
    var department = $('#ata-department').val();
    var content = $('#ata-content').val();

    Meteor.call('addata', subject, date, department, content, function (error) {
      if (error) {
        displayMessage('alert-danger', error);
      } else {
        displayMessage('alert-success', 'Ata inserida com sucesso na base de dados.');
        $('#ata-subject').val('');
        $('#ata-date').val('');
        $('#ata-content').val('');
      }
    });
  }
});
