Template.calendar.rendered = function () {
  Meteor.call('generateEvents', function (error, data) {
    if (error) {
      //Dislpay error
    } else {
      $('#calendar').fullCalendar({
        events: data,
        eventClick: function(calEvent, jsEvent, view) {
          event_f = Meetings.find({ _id: calEvent.db_id }).fetch()[0];

          console.log(event_f);
        }
      });
    }
  });
}
