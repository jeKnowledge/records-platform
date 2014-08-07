Template.newata.rendered = function () {
    $('#ata-date').datepicker();
}

Template.newata.events({
  'submit #new-ata-form': function (evt, tmpl) {
    evt.preventDefault();
    var subject = $('#ata-subject').val();
    var date = $('#ata-date').val();
    var department = $('#ata-department').val();
    var content = $('#ata-content').val();

    Meteor.call('addata', subject, date, department, content);

    $('#ata-subject').val('');
    $('#ata-date').val('');
    $('#ata-content').val('');
  }
});
