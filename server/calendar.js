Meteor.methods({
  'generateEvents': function () {
    var meetings = Meetings.find().fetch();
    var data = [];

    for (var i = 0; i < meetings.length; i++) {
      var temp = { title: Projects.find({ _id: meetings[i].project }).fetch()[0].name,
                   start: meetings[i].date,
                   db_id: meetings[i]._id }

      data[data.length] = temp;
    };

    return data;
  } 
})
