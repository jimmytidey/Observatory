

//make this available on the client side
Meteor.methods({
    facebook_mentions: function (source_id, parameter) {  
        parser.facebook.getFacebookMentions(source_id, parameter);
    }
});

parser.facebook.getFacebookMentions = function(source_id, parameter) {
    
    //wrap up async functions 
    var wrappedfacebookSearchPageIdByName = Meteor._wrapAsync(parser.facebook.searchPageIdByName); 
    var wrappedfacebookGetMentionsById = Meteor._wrapAsync(parser.facebook.getMentionsById);   
    
    //now we can use them in a fiber...
    var page_id_results = wrappedfacebookSearchPageIdByName(parameter);
    var id = page_id_results.data[0].id;
    var res = wrappedfacebookGetMentionsById(id);
    var mentions = res.tagged.data;
    
    //stick them the DB
    parser.facebook.insertMentions(mentions, parameter);
    
}  


parser.facebook.insertMentions = function(mentions, parameter) { 
    for(var i=0; i< mentions.length; i++){
        
        var item = parser.facebook.buildUpdate(mentions[i], 'facebook_mention', parameter);
    
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



