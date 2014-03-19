var fb = Meteor.require('fbgraph');

Meteor.methods({
    facebook_posts: function (url, parameter, id) {

        fb.setAccessToken(global.observatory_keys['facebook_access_token']);
        var options = {
            timeout: 3000,
            pool: {maxSockets: Infinity},
            headers: {connection: "keep-alive"}
        }
    
        fb.setOptions(this.options);
        
        fb.listSync = Meteor._wrapAsync(fb.get.bind(fb));
        
        fb.listSync('287722591249932?fields=posts', function(err, res) {
            var data = res.posts.data;
            
            for(var i=0; i< data.length; i++){
                var date         = new Date(data[i].created_time);
                var timestamp    = date.getTime();
                var current_time = new Date().getTime();
            
                var item = { 
                    native_id: data[i].id, 
                    title: data[i].message,
                    author_name: data[i].from.name,
                    author_id: data[i].from.id,
                    content:'',
                    time_generated: timestamp,
                    time_recorded:current_time, 
                    url: data[i].link,
                    feed_name: url,
                    feed_parameter:parameter,
                    source:'facebook'
                }
                
                var extant = Updates.find({native_id: data[i].id}).count();
                
                if (extant === 0) {
                    console.log('inserting', item);
                    Updates.insert(item);
                }
                else { 
                    console.log('duplicate', item);    
                }
                
                
            }    
        });
            
    }
});