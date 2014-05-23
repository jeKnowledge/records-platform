Template.meeting.name = function (){
  return Meetings.findOne({_id: this._id }).name;
};

Template.meeting.selected = function() {
  return Session.equals('selectedMeeting', this._id) ? 'selected' : '';
};

Template.meeting.events({
  'click': function() {
    Session.set('selectedMeeting', this._id);
  }
});
