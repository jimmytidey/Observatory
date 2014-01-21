Template.recentItemsItem.events({
    'click .remove_item': function () {
        console.log('remove item');
        Items.remove({_id:this._id});
    }
});