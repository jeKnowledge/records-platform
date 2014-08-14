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

    if (membro_id === 'empty') {
      //Display message: select a member please
    } else {
      var membro = Members.find({ _id: membro_id }).fetch()[0];
      var array = Session.get('added');
      array[array.length] = membro;

      Session.set('added', array);
    }
  }
});
