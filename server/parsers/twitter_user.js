var util    = Meteor.require('util');
var twitter = Meteor.require('twitter');

Meteor.methods({
    data_feed_go: function (url, parameter) {
        if(url === 'twitter_user'){ 
  
            var twit = new twitter({
                consumer_key: global.observatory_keys['twitter_consumer_key'],
                consumer_secret: global.observatory_keys['twitter_consumer_secret'],
                access_token_key: global.observatory_keys['twitter_access_token'],
                access_token_secret: global.observatory_keys['twitter_access_token_secret']
            });

            twit.get('/statuses/user_timeline.json', {screen_name:'jimmytidey'}, function(data) {
                console.log(data);
                
            });
        }
    }
});