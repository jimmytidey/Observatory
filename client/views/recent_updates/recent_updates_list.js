Template.recentUpdatesList.helpers({
    recentUpdates: function() {
        return Updates.find({},{limit:100, sort: {time_recorded: -1} } );
    }
});

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});