Template.recentItemsList.helpers({
    recentItems: function() {
        return Items.find({},{limit:100, sort: {time_recorded: -1} } );
    }
});

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});