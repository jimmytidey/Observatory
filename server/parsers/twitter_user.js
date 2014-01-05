var util = Meteor.require('util'),
    twitter = Meteor.require('twitter');    
    
var twit = new twitter({
    consumer_key: global.observatory_keys['twitter_consumer_key'],
    consumer_secret: global.observatory_keys['twitter_consumer_secret'],
    access_token_key: global.observatory_keys['twitter_access_token'],
    access_token_secret: global.observatory_keys['twitter_access_token_secret']
});

twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
    console.log(util.inspect(data));
});