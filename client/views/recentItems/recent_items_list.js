Template.recentItemsList.helpers({
    recentItems: function() {
        return Items.find({},{limit:10, sort: {time_generated: -1} } );
    }
});