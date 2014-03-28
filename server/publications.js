Meteor.publish('updates', function() {
    return Updates.find();
});

Meteor.publish('sources', function() {
    return Sources.find();
});

Meteor.publish('sourceTypes', function() {
    return SourceTypes.find();
});

Meteor.publish('scrapeLog', function() {
    return ScrapeLog.find();
});