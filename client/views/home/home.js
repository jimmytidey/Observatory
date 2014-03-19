Template.homeUpdatesList.helpers({
    homeUpdates: function() {
        return Updates.find({},{sort: {time_generated: -1} } );
    }
});