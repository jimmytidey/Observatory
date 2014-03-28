var fb = Meteor.require('fbgraph');

Meteor.methods({
    facebook_posts: function (type, parameter, source_id) {
        parser.facebook.getFacebookPosts(source_id, parameter);
    }    
});

parser.facebook.getFacebookPosts = function(source_id, parameter) { 

    //wrap up async functions 
    var wrappedfacebookSearchUserIdByName = Meteor._wrapAsync(parser.facebook.searchUserIdByName); 
    var wrappedfacebookGetPostsById = Meteor._wrapAsync(parser.facebook.getPostsById);

    parser.logging.start(source_id);
    
    //allow the user to put in either a name or a userid
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    if(!isNumber(parameter)) {
        var page_id_results = wrappedfacebookSearchUserIdByName(parameter);
        console.log(page_id_results);
        var id = page_id_results.data[0].id;
    }
    else { 
        var id = parameter;
    }
    
    //now we can use them in a fiber...
    var res = wrappedfacebookGetPostsById(id);
    var posts = res.posts.data;
    
    parser.facebook.insertPosts(posts, parameter);
    
    parser.logging.sucess(source_id);
}

parser.facebook.insertPosts = function(posts, parameter) { 
    for(var i=0; i< posts.length; i++){

        var item = parser.facebook.buildUpdate(posts[i], 'facebook_post', parameter);

        parser.facebook.saveUpdate(item);
    }    

}