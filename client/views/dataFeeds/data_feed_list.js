Template.dataFeedList.helpers({
    dataFeed: function() {
        return DataFeeds.find();
    }
});

Template.dataFeedItem.events({
  'click .data_feed_go': function () {
      Meteor.call('data_feed_go', this.url, this.parameter, this._id);
  }
});