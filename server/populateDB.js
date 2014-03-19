//populate the source types DB with the basic options that are supported internally  
Meteor.startup(function () {
    var default_source_types = ['facebook_mentions','facebook_posts', 'twitter_search', 'twitter_user', 'blog'];
    
    for (var i = 0; i < default_source_types.length; i++) { 
        var extant = SourceTypes.find({'name': default_source_types[i]}).count();
        if (extant === 0) {
            console.log("adding default data type: "  + default_source_types[i]);
            var new_source_type = {'name': default_source_types[i], 'url': default_source_types[i]};     
            SourceTypes.insert(new_source_type);
        }
        else { 
            console.log("already added to the DB: "  + default_source_types[i]);
        }
    }
});