var updateForm = function (subject, date, department, content) {
  $('#edit-ata-subject').val(subject);
  $('#edit-ata-date').val(date);
  $('#edit-ata-department').val(department);
  $('#edit-ata-content').val(content);  
};

var displayMessage = function (tipo, message) {
  $('#manage-info-paragraph-text').text(message);

  $('#manage-info-paragraph').show();
  $('#manage-info-paragraph').removeClass();
  $('#manage-info-paragraph').addClass('form-element');
  $('#manage-info-paragraph').addClass('alert');
  $('#manage-info-paragraph').addClass(tipo);
}

Template.manageatas.rendered = function () {
  //Iniciar Date Picker
  $('#edit-ata-date').datepicker();

  //Hide Info Paragraph
  $('#manage-info-paragraph').hide();

  // BUG: db not ready and next two lines crash
  
  //Iniciar Form 
  var firstAta = Atas.findOne();
  updateForm(firstAta.subject, firstAta.date, firstAta.department, firstAta.content);
}

Template.manageatas.atas = function () {
  return Atas.find( {}, { sort: {date: -1} });
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

    Meteor.call('updateata', subject, date, department, content, ataId, function (error) {
      if (error) {
        displayMessage('alert-danger', error);
      } else {
        displayMessage('alert-success', 'Ata atualizada com sucesso.');
      }
    });
  },
  'click #download-pdf': function (evt, tmpl) {
    var selectedAta = $('#ata-selector option:selected').attr('name');
    var searchAta = Atas.find({ _id: selectedAta }).fetch()[0];
    
    var doc = new jsPDF();
    
    doc.setFontSize(30);
    doc.text(30, 30, searchAta.subject);

    doc.setFontSize(14);
    doc.text(30, 45, 'Data: '+searchAta.date);
    doc.text(30, 55, 'Departamento: '+searchAta.department);

    doc.setFontSize(12);
    doc.text(30, 65, searchAta.content);

    var out = doc.output('datauristring');
    var x = window.open();
    x.document.open();
    x.document.location=out;
  }
});
