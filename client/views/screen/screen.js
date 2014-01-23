Template.screenItemsList.helpers({
    screenItemsList: function() {
        return Items.find({},{sort: {time_generated: -1} } );
    }
});