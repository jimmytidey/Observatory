var util    = Meteor.require('util');
var twitter = Meteor.require('twitter');

Meteor.methods({
    data_feed_go: function (url, parameter, id) {
        if(url === 'twitter_user'){ 
  
            var twit = new twitter({
                consumer_key: global.observatory_keys['twitter_consumer_key'],
                consumer_secret: global.observatory_keys['twitter_consumer_secret'],
                access_token_key: global.observatory_keys['twitter_access_token'],
                access_token_secret: global.observatory_keys['twitter_access_token_secret']
            });
            
            twit.listSync = Meteor._wrapAsync(twit.get.bind(twit));
            
            twit.listSync('/statuses/user_timeline.json', {screen_name:parameter}, function(data) {
                for(var i=0; i< data.length; i++){ 
                    var item = { 
                        native_id: data[i].id_str, 
                        title: data[i].text,
                        author: parameter,
                        author_id: data[i].user.id,
                        content:'',
                        feed_name: url
                    } 
                    console.log(item)
                }
                Items.insert(item);
            });
        }
    }
});