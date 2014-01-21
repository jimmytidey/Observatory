var fb = Meteor.require('fbgraph');
var Fiber = Meteor.require( "fibers" );

Meteor.methods({
    facebook_mentions: function (url, parameter, id) {
        console.log('hi');
        fb.setAccessToken(global.observatory_keys['facebook_access_token']);
        var options = {
            timeout: 3000,
            pool: {maxSockets: Infinity},
            headers: {connection: "keep-alive"}
        }
    
        fb.setOptions(this.options);
        
        console.log(parameter)
        fb.get(parameter, function(err, res) {
            var group_id = res.id; 
            
            fb.get(group_id + '?fields=tagged', function(err, res) {
                var data = res.tagged.data;

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
                        feed_parameter_desc: data[i].from.name + ' mentioned "' + parameter + '" on Facebook' ,
                        source:'Facebook'
                    }

                    Fiber( function(){
                        var extant = Items.find({native_id: data[i].id}).count();

                        if (extant === 0) {
                            console.log('inserting', item);
                            Items.insert(item);
                        }
                        else { 
                            console.log('duplicate', item);    
                        }
                    }).run();


                }    
            });        
        
        
        });
        

            
    }
});