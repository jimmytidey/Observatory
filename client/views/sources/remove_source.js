Template.source.events({
    'click .remove_data_feed': function () {
        Sources.remove({_id:this._id});
    }
});