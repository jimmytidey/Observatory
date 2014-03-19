Template.screenUpdatesList.helpers({
    screenUpdates: function() {
        return Updates.find({},{sort: {time_generated: -1} } );
    }
});