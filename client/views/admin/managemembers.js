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

Template.managemembers.membros = function () {
  return Members.find();
}

Template.managemembers.events({
  'submit #new-member-form': function (evt, tmpl) {
    evt.preventDefault();      
    var nome = $('#member-name').val();
    var email = $('#member-email').val();
    var departamento = $('#member-department').val();
    
    Meteor.call('addmember', nome, email, departamento, function (error) {
      if (error) {
        displayMessage('alert-danger', error);
      } else {
        displayMessage('alert-success', 'Membro inserido com sucesso.');
        $('#member-name').val('');
        $('#member-email').val('');
      }
    });
  }, 
  'change #membro-selector': function (evt, tmpl) {
    var selectedMember = $('#membro-selector option:selected').attr('name');

    if (selectedMember === 'empty') {
      $('#edit-member-name').val('');
      $('#edit-member-email').val('');      
    } else {
      var searchMember = Members.find({ _id: selectedMember }).fetch()[0];
      $('#edit-member-name').val(searchMember.name);
      $('#edit-member-email').val(searchMember.email);
      $('#edit-member-department').val(searchMember.department);      
    }
  },
  'click #update-member': function () {
    var memberId = $('#membro-selector option:selected').attr('name');
    var nome = $('#edit-member-name').val();
    var email = $('#edit-member-email').val();
    var department = $('#edit-member-department').val(); 

    if (memberId === 'empty') {
      displayMessage('alert-info', 'Escolha um membro primeiro.');
    } else {
      Meteor.call('updatemember', memberId, nome, email, department, function (error) {
        if (error) {
          displayMessage('alert-danger', error);
        } else {
          displayMessage('alert-success', 'Membro atualizado com sucesso.');
        }
      });
    }
  },
  'click #delete-member': function (evt, tmpl) {
    var memberId = $('#membro-selector option:selected').attr('name');
    
    if (memberId === 'empty') {
      displayMessage('alert-info', 'Escolha um membro primeiro.');
    } else {
      Meteor.call('deletemember', memberId, function (error) {
        if (error) {
          displayMessage('alert-danger', error);
        } else {
          displayMessage('alert-success', 'Membro eliminado com sucesso.');
          $('#edit-member-name').val('');
          $('#edit-member-email').val('');
       }
      });
    }
  }
}); 
