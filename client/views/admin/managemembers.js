var displayMessage = function (tipo, message) {
  $('#info-paragraph-text').text(message);

  $('#info-paragraph').show();
  $('#info-paragraph').removeClass();
  $('#info-paragraph').addClass('form-element');
  $('#info-paragraph').addClass('alert');
  $('#info-paragraph').addClass(tipo);
}

Template.managemembers.rendered = function () {
  //Hide Info Paragraph
  $('#info-paragraph').hide();
}

Template.managemembers.events({
  'submit #new-member-form': function (evt, tmpl) {
    evt.preventDefault();      
    var nome = $('#member-name').val();
    var email = $('#member-email').val();
    var departamento = $('#member-department').val();
    
    Meteor.call('addMember', nome, email, departamento, function (error) {
      if (error) {
        displayMessage('alert-danger', error);
      } else {
        displayMessage('alert-success', 'Membro inserido com sucesso.');
        $('#member-name').val('');
        $('#member-email').val('');
      }
    });
  }
}); 
