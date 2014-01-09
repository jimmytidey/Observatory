Template.dataFeedList.helpers({
    dataFeed: function() {
        return DataFeeds.find();
    }
});

//TODO: change the name URL to type... 
Template.dataFeedItem.events({
    'click .data_feed_go': function () {
        Meteor.call(this.url, this.url, this.parameter, this._id);
    }
});