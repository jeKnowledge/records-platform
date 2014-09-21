Meteor.startup(function () {
  Session.set('atasLoaded', false);
  Session.set('meetingsLoaded', false);
  Session.set('projectsLoaded', false);
  Session.set('userDataLoaded', false);

  Session.set('selectedMeeting', 'empty');

}); 

Meteor.subscribe('atas', function () {
  Session.set('atasLoaded', true);
});

Meteor.subscribe('meetings', function () {
  Session.set('meetingsLoaded', true);
});

Meteor.subscribe('projects', function () {
  Session.set('projectsLoaded', true);
});

Meteor.subscribe('userData', function () {
  Session.set('userDataLoaded', true);
});

/* General Functions */

//Display Alert Function
displayAlert = function (which, type, message) {
  $(which + '-text').text(message);

  $(which).show();
  $(which).removeAttr('class')
  $(which).addClass('alert');
  $(which).addClass(type);
}

//Get Current Date Function
currentDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd < 10) {
    dd='0'+dd
  } 

  if(mm < 10) {
    mm='0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today; 
}

//Generate PDF Function
generatePDF = function (ataID) {
  var searchAta = Atas.find({ _id: ataID }).fetch()[0];
  searchAta.meeting = Projects.find({ _id: Meetings.find({ _id: searchAta.meeting }).fetch()[0].project }).fetch()[0].name;
  for (var i = 0; i < searchAta.members.length; i++) {
    searchAta.members[i] = Meteor.users.find({ _id: searchAta.members[i] }).fetch()[0].profile.name;
  };

  var doc = new jsPDF();

  doc.setFontSize(25);
  doc.text(30, 30, 'Ata ' + searchAta.meeting);

  doc.setFontSize(14);
  doc.text(30, 40, 'Data: ' + searchAta.date);

  doc.setFontSize(12);
  doc.text(30, 50, 'Membros presentes: ');
  doc.text(30, 55, searchAta.members);
  doc.text(30, 50 + (searchAta.members.length * 10), searchAta.content);


  var out = doc.output('datauristring');
  var x = window.open();
  x.document.open();
  x.document.location=out;
}
