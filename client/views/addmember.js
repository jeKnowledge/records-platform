var contains = function (array, element) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]._id === element._id) {
      return true;
    }
  };

  return false;
}

Template.addmember.members = function () {
  return Members.find();
}

Template.addmember.rendered = function () {
  Session.set('added', []);
}

Template.addmember.addedm = function () {
  return Session.get('added');
}

Template.addmember.events({
  'click #add-member': function (evt, tmpl) {
    var membro_id = $('#members-select option:selected').attr('name');

    $('#test').hide();
    if (membro_id === 'empty') {
      displayMessage('alert-info', 'Escolha um membro em primeiro lugar');
    } else {
      var membro = Members.find({ _id: membro_id }).fetch()[0];
      var array = Session.get('added');

      if (contains(array, membro)) {
        displayMessage('alert-info', 'Membro ja foi adicionado.');
      } else {
        array[array.length] = membro;
        Session.set('added', array);
      }

      //Hide initial message
      $('#initial-message').hide();
    }
  }
});
