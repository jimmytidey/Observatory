var fb = Meteor.require('fbgraph');
parser.facebook = {};


parser.facebook.apiSettings = function(fb) { 
    fb.setAccessToken(parser.observatory_keys['facebook_user_token']);
    
    var options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    return fb;
}

parser.facebook.searchPageIdByName = function(name, cb) { 

    fb = parser.facebook.apiSettings(fb);

    var searchOptions = {
        q:     name
      , type:  "page"
    };
    
    fb.search(searchOptions, function(err,res) { 
        cb(err,res);
    });
}  

parser.facebook.searchUserIdByName = function(name, cb) { 

    fb = parser.facebook.apiSettings(fb);

    var searchOptions = {
        q:     name
      , type:  "user"
    };
    
    fb.search(searchOptions, function(err,res) { 
        cb(err,res);
    });
}     

parser.facebook.getMentionsById = function(id, cb) { 

    fb = parser.facebook.apiSettings(fb);
    
    fb.get(id + '?fields=tagged', function(err, res) {
        cb(err,res);
    });
}  

parser.facebook.getPostsById = function(id, cb) { 

    fb = parser.facebook.apiSettings(fb);
    
    fb.get(id + '?fields=posts', function(err, res) {
        cb(err,res);
    });
}  



parser.facebook.saveUpdate = function(update) { 
    
    var extant = Updates.find({native_id: update.id}).count();

    if (extant === 0) {
        console.log('inserting');
        Updates.insert(update);
    }
    
    else { 
        console.log('duplicate');    
    }
}

parser.facebook.buildUpdate = function(update, feed_type, parameter) { 
    
    var date         = new Date(update.created_time);
    var timestamp    = date.getTime();
    var current_time = new Date().getTime();
    
    var update = { 
        native_id: update.id, 
        title: update.message,
        author_name: update.from.name,
        author_id: update.from.id,
        content:'',
        time_generated: timestamp,
        time_recorded:current_time, 
        url: update.link,
        feed_type: feed_type,
        feed_parameter:parameter,
        feed_parameter_desc: update.from.name + ' mentioned "' + parameter + '" on Facebook' ,
        source:'Facebook'
    }
    
    return update;
    
}
