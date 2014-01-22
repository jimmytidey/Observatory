Router.map(function () {
    
    this.route('home',{
        path: '/'
    });

    this.route('dashboard',{
        path: '/dashboard'
    });
    
    this.route('screen',{
        path: '/screen'
    });
    
    this.route('stream', {
       path: '/stream/',
       where: 'server',
       action: function() {
         
         var data = {};
         data.results = [];
         
         var mode = PrintMode.findOne({}, {sort: {time: -1}});
         
         data.mode = mode;
         
         if(typeof mode === "undefined"){
             var items = Items.find({},{limit:10, skip:0, sort: {time_generated: 1} });
         }
         else if (mode.feed_name == 'none') { 
             var items = Items.find({},{limit:mode.limit, skip:mode.skip, sort: {time_generated: -1} });
         } else { 
             var items = Items.find({feed_name: mode.feed_name},{limit:mode.limit, skip:mode.skip, sort: {time_generated: -1} });
         }
        
         
         items.forEach(function (item) {
            item.time_generated = moment(new Date(item.time_generated)).fromNow();
            //make printable
            item.title = item.title.replace(/[^\x00-\x7F]/g, "");
            item.feed_parameter_desc = item.feed_parameter_desc.replace(/[^\x00-\x7F]/g, "");
            item.time_generated = item.time_generated.replace(/[^\x00-\x7F]/g, "");
            
            data.results.push(item);
         });
         
         console.log(data);
         
         this.response.writeHead(200, {'content-type': 'text/json' });
         this.response.write(JSON.stringify(data));
         this.response.end('\n');
       }
    });
        

});