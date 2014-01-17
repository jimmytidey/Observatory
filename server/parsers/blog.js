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
                while (item = stream.read()) {
                    
                    var date         = new Date(item.pubdate);
                    var timestamp    = date.getTime();
                    var current_time = new Date().getTime();

                    var new_item = {
                        native_id: null,
                        title: item.title,
                        author_name: item.author,
                        author_id: null,
                        content: item['atom:summary']['#'],
                        time_generated: current_time,
                        time_recorded: timestamp,
                        url: item['atom:link']['@']['href'],
                        feed_name: url,
                        feed_parameter: parameter,
                        source: 'blog'
                    }

                    Fiber( function(){
                        var extant = Items.find({
                            url: item['atom:link']['@']['href']
                        }).count();


                        if (extant === 0) {
                            console.log('inserting', new_item);
                            Items.insert(new_item);
                        } else {
                            console.log('duplicate', new_item);
                        }
                    }).run();
                }
            });
}  
    
var wrappedGetBlog = Meteor._wrapAsync(getBlog);


Meteor.methods({
    blog: function (url, parameter, id) {
        console.log('parsing blog');
        var items = wrappedGetBlog(url, parameter, id);
    }
});

    