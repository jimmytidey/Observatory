Template.recentUpdate.events({
    'click .remove_item': function () {
        console.log('remove item');
        Updates.remove({_id:this._id});
    }
});