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

parser.facebook.searchUserIdByName = function(name, callback) { 

    fb = parser.facebook.apiSettings(fb);

    var searchOptions = {
        q:     name
      , type:  "user"
    };
    
    fb.search(searchOptions, function(err,res) { 
        callback(err, res);
    });
}     

parser.facebook.getMentionsById = function(id, cb) { 

    fb = parser.facebook.apiSettings(fb);
    
    fb.get(id + '?fields=tagged', function(err, res) {
        cb(err,res);
    });
}  

parser.facebook.getPostsById = function(id, callback) { 
    
    fb = parser.facebook.apiSettings(fb);
    
    fb.get(id + '?fields=posts', function(err, res) {
        callback(err, res);
    }); 
}  



parser.facebook.saveUpdate = function(update) { 
    
    var extant = Updates.find({native_id: update.native_id}).count();
    
    console.log(extant);
    
    if (extant === 0) {
        console.log('inserting');
        Updates.insert(update);
        return true; 
    }
    
    else { 
        console.log('duplicate');    
        return false; 
    }
}


