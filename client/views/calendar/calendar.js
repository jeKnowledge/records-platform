Template.calendar.rendered = function () {
  Meteor.call('generateEvents', function (error, data) {
    if (error) {
      //Dislpay error
    } else {
      $('#calendar').fullCalendar({
        events: data
      });
    }
  });
}
