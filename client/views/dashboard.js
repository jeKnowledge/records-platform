Template.dashboard.meetings = function () {
	return Meetings.find({});
};

Template.dashboard.events({
	'click #new-metting-btn': function() {
		Meteor.call('newMeeting', function(error) {
		if (error) {
			console.log(error);
		}
	});
	}		
});