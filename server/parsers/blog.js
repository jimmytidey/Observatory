var FeedParser = Meteor.require('feedparser');
var request = Meteor.require('request');
var Fiber = Meteor.require( "fibers" );


function getBlog(url, parameter, id){
    var new_items =[];
    request(parameter)
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(new FeedParser())
        .on('error', function (error) {
            console.error(error);
        })
    
        .on('readable',  function () {
                var stream = this,item;
                Fiber( function(){
                    while (item = stream.read()) {
                    
                        var date         = new Date(item.pubdate);
                        var timestamp    = date.getTime();
                        var current_time = new Date().getTime();
                        console.log(item);
                        //TODO: time_generated would be better as time_published
                        //TODO: watch out for this harad coded blog link
                        var new_item = {
                            native_id: null,
                            title: item.title,
                            author_name: item.author,
                            author_id: null,
                            content: item['atom:summary']['#'],
                            time_generated: timestamp,
                            time_recorded: current_time,
                            url: item['atom:link']['@']['href'],
                            feed_name: url,
                            feed_parameter: parameter,
                            feed_parameter_desc: "Blog post from: fact.co.uk/news-views",
                            source: 'blog'
                        }
                    
                        var extant = Updates.find({
                            url: item['atom:link']['@']['href']
                        }).count();

                        if (extant === 0) {
                            console.log('inserting', new_item);
                            Updates.insert(new_item);
                        } else {
                            console.log('duplicate', new_item);
                        }
                    }
                }).run();
            });
}  
    
var wrappedGetBlog = Meteor._wrapAsync(getBlog);


Meteor.methods({
    blog: function (url, parameter, id) {
        console.log('parsing blog');
        var items = wrappedGetBlog(url, parameter, id);
    }
});

    