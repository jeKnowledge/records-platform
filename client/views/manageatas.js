var updateForm = function (subject, date, department, content) {
  $('#edit-ata-subject').val(subject);
  $('#edit-ata-date').val(date);
  $('#edit-ata-department').val(department);
  $('#edit-ata-content').val(content);  
};

Template.manageatas.rendered = function () {
    $('#edit-ata-date').datepicker();
    var firstAta = Atas.findOne();
    updateForm(firstAta.subject, firstAta.date, firstAta.department, firstAta.content);
}

Template.manageatas.atasubject = function () {
  return Atas.find();
}

Template.manageatas.events({
  'change #ata-selector': function (evt, tmpl) {
    //May broke up if two atas have the same name (fix later)
    var selectedAta = $('#ata-selector option:selected').attr('name');
    var searchAta = Atas.find({ _id: selectedAta }).fetch()[0];
    updateForm(searchAta.subject, searchAta.date, searchAta.department, searchAta.content);
  },
  'submit #edit-ata-form': function (evt, tmpl) {
    evt.preventDefault();
    var subject = $('#edit-ata-subject').val();
    var date = $('#edit-ata-date').val();
    var department = $('#edit-ata-department').val();
    var content = $('#edit-ata-content').val();
    var ataId = $('#ata-selector option:selected').attr('name');

    Meteor.call('updateata', subject, date, department, content, ataId);
  }
});
