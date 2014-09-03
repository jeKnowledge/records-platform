var currentDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today; 
}

Template.sideBar.meetings = function () {
  var array = Meetings.find({ members: Meteor.userId(), date: {$gte: currentDate()} }, { sort: {date: 1} }).fetch();

  for (var i = 0; i < array.length; i++) {
    array[i].project = Projects.find({ _id: array[i].project}).fetch()[0].name;
  };

  return array;
}

Template.sideBar.events({
  'click .meeting-list-item': function (evt, tmpl) {
    //Show Modal
  }
})
