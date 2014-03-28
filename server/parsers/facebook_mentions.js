

//make this available on the client side
Meteor.methods({
    facebook_mentions: function (source_id, parameter) {  
        parser.facebook.getFacebookMentions(source_id, parameter);
    }
});

parser.facebook.getFacebookMentions = function(source_id, parameter) {
    
    //wrap up async functions 
    var wrappedfacebookSearchPageIdByName = Async.wrap(parser.facebook.searchPageIdByName); 
    var wrappedfacebookGetMentionsById = Async.wrap(parser.facebook.getMentionsById);   
    
    //now we can use them in a fiber...
    var page_id_results = wrappedfacebookSearchPageIdByName(parameter);
    var id = page_id_results.data[0].id;
    var res = wrappedfacebookGetMentionsById(id);
    var mentions = res.tagged.data;
    
    //stick them in the DB
    parser.facebook.insertMentions(mentions, parameter);
    
}  


parser.facebook.insertMentions = function(mentions, parameter) { 
    for(var i=0; i< mentions.length; i++){
        
        var item = parser.facebook.buildMention(mentions[i], parameter);
    
        item.context = {};

        if (mentions[i].from.name) { 
            item.context.from = mentions[i].from.name;
        }

        if (mentions[i].to && mentions[i].to.mentions) { 
            item.context.to = mentions[i].to.mentions[0].name;
        }

        if (mentions[i].link) {
            item.context.link = mentions[i].link;
        }
  
        parser.facebook.saveUpdate(item);
    }    

}


parser.facebook.buildMention = function(update, parameter) { 
    
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
        feed_type: 'facebook_mention',
        feed_parameter:parameter,
        feed_parameter_desc: update.from.name + ' mentioned "' + parameter + '" on Facebook' ,
        source:'Facebook'
    }
    
    return update;   
}


