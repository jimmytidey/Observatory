Template.homeItemsList.helpers({
    homeItems: function() {
        return Items.find({},{sort: {time_generated: -1} } );
    }
});