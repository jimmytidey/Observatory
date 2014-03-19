Meteor.publish('updates', function() {
  return Updates.find();
});

Meteor.publish('sources', function() {
  return Sources.find();
});