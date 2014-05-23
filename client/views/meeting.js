Template.meal.name = function (){
 return Meetings.findOne({_id: this._id }).name;
};