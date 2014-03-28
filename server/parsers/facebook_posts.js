var fb = Meteor.require('fbgraph');

Meteor.methods({
    facebook_posts: function (source_id, parameter) {
      
        parser.facebook.getFacebookPosts(source_id, parameter);
    }    
});

parser.facebook.getFacebookPosts = function(source_id, parameter) { 

    //wrap up async functions 
    var wrappedfacebookGetPostsById = Async.wrap(parser.facebook.getPostsById);
    
    var scrape_id = parser.logging.start(source_id);
     
    try {
        var res = wrappedfacebookGetPostsById(parameter);        
        var posts = res.posts.data;
        var number_of_inserts = parser.facebook.insertPosts(posts, parameter, scrape_id);
        console.log("no", number_of_inserts);
        parser.logging.success(scrape_id,source_id, number_of_inserts);        
    } catch(err) { 
        err = JSON.stringify(err)
        parser.logging.fail(scrape_id, source_id, err);
    }
}

parser.facebook.insertPosts = function(posts, parameter, scrape_id) { 
    var insert_count = 0; 
    for(var i=0; i< posts.length; i++){
        var item = parser.facebook.buildPost(posts[i], parameter, scrape_id);
        if(parser.facebook.saveUpdate(item)){ 
            insert_count ++; 
        }
    }
    return insert_count;
}

parser.facebook.buildPost = function(update, parameter, scrape_id) { 
    
    var date         = new Date(update.created_time);
    var timestamp    = date.getTime();
    var current_time = new Date().getTime();

    if (update.story) { 
        var title = update.story;
    }
    else { 
        var title = update.message;
    }
    
    var post = { 
        native_id: update.id, 
        title: title,
        author_name: update.from.name,
        author_id: update.from.id,
        content:update.message,
        time_generated: timestamp,
        time_recorded:current_time, 
        url: update.link,
        feed_parameter:parameter,
        source:'facebook_post',
        scrape_id: scrape_id
    }
    
    return post;   
}

