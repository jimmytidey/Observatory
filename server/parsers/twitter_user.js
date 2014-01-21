var util    = Meteor.require('util');
var twitter = Meteor.require('twitter');

Meteor.methods({
    twitter_user: function (url, parameter, id) {
            
            console.log('Parsing Twitter Users');
            
            var twit = new twitter({
                consumer_key: global.observatory_keys['twitter_consumer_key'],
                consumer_secret: global.observatory_keys['twitter_consumer_secret'],
                access_token_key: global.observatory_keys['twitter_access_token'],
                access_token_secret: global.observatory_keys['twitter_access_token_secret']
            });
            
            twit.listSync = Meteor._wrapAsync(twit.get.bind(twit));
            
            twit.listSync('/statuses/user_timeline.json', {screen_name:parameter}, function(data) {
                
                console.log('twitter data back', data);
                
                for(var i=0; i< data.length; i++){ 
                    console.log(data);
                    var date         = new Date(data[i].created_at);
                    var timestamp    = date.getTime();
                    var current_time = new Date().getTime();
                    var item = { 
                        native_id: data[i].id_str, 
                        title: data[i].text,
                        author_name: parameter,
                        author_id: data[i].user.id,
                        content:'',
                        time_generated: timestamp,
                        time_recorded:current_time,
                        url: "https://twitter.com/" + parameter + "/status/"+ data[i].id_str,
                        feed_name: url,
                        feed_parameter:parameter,
                        feed_parameter_desc: '@' + parameter + ' via Twitter',
                        source: "Twitter"
                    }
                    
                    var extant = Items.find({native_id: data[i].id_str}).count();
                    
                    if (extant === 0) {
                        console.log('inserting', item);
                        Items.insert(item);
                    }
                    else { 
                        console.log('duplicate', item);    
                    }
                }
                
            });
        }
});