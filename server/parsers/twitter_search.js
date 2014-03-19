var util    = Meteor.require('util');
var twitter = Meteor.require('twitter');

Meteor.methods({
    twitter_search: function (url, parameter, id) {
            
            console.log('Parsing Twitter Search');
            
            var twit = new twitter({
                consumer_key: global.observatory_keys['twitter_consumer_key'],
                consumer_secret: global.observatory_keys['twitter_consumer_secret'],
                access_token_key: global.observatory_keys['twitter_access_token'],
                access_token_secret: global.observatory_keys['twitter_access_token_secret']
            });
            
            twit.listSync = Meteor._wrapAsync(twit.get.bind(twit));
            
            twit.listSync('/search/tweets.json', {q:parameter}, function(data) {
                
                for(var i=0; i< data.statuses.length; i++){ 
                                       
                    var date         = new Date(data.statuses[i].created_at);
                    var timestamp    = date.getTime();
                    var current_time = new Date().getTime();

                    var item = { 
                        native_id: data.statuses[i].id_str, 
                        title: data.statuses[i].text,
                        author_name: data.statuses[i].user.screen_name,
                        author_id: data.statuses[i].user.id,
                        author_image: data.statuses[i].user.profile_image_url,
                        content:'',
                        time_generated: timestamp,
                        time_recorded:current_time,
                        url: "https://twitter.com/" + parameter + "/status/"+ data.statuses[i].id_str,
                        feed_name: url,
                        feed_parameter:parameter, 
                        feed_parameter_desc:  parameter + ' by ' + data.statuses[i].user.screen_name +  ' on Twitter',
                        source: "Twitter"
                    }
                   
                    
                    item.context = {};
                    item.context.urls       = [];
                    item.context.mentions   = [];
                   
                    for(var j =0;  j < data.statuses[i]['entities'].urls.length; j++) { 
                        item.context.urls.push(data.statuses[i]['entities'].urls[j].expanded_url);
                    }
                    
                    for(var j =0;  j < data.statuses[i]['entities']['user_mentions'].length; j++) { 
                        item.context.mentions.push(data.statuses[i]['entities']['user_mentions'][j].screen_name);
                    }
          
                    
                    var extant = Updates.find({native_id: data.statuses[i].id_str}).count();
                    
                    if (extant === 0) {
                        //console.log('inserting', item);
                        Updates.insert(item);
                    }
                    else { 
                        //console.log('duplicate', item);    
                    }
                }
                
            });
        }
});