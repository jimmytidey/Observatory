Template.sourcesList.helpers({
    sources: function() {
        return Sources.find();
    }
});

//TODO: change the name URL to type... 
Template.sourcesList.events({
    'click .data_feed_go': function () {
        Meteor.call(this.url, this.url, this.parameter, this._id);
    }
});