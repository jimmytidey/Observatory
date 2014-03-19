Meteor.publish('updates', function() {
    return Updates.find();
});

Meteor.publish('sources', function() {
    return Sources.find();
});

Meteor.publish('sourceTypes', function() {
    return SourceTypes.find();
});