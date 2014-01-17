Template.dataFeedItem.events({
    'click .remove_data_feed': function () {
        console.log('remove item');
        DataFeeds.remove({_id:this._id});
    }
});