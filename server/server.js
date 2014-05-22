Meteor.methods({
	newMeeting: function () {
		Meetings.insert({ name:"Nova"});
		console.log("Sucesso");
	}
});