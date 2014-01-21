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
         
         var data = [];
         
         var mode = PrintMode.findOne({},{sort: {_id: -1} });
         console.log(mode);
         if (mode.feed_name == 'none') { 
             var items = Items.find({},{limit:mode.limit, skip:mode.skip, sort: {time_generated: -1} });
         } else { 
             var items = Items.find({feed_name: mode.feed_name},{limit:mode.limit, skip:mode.skip, sort: {time_generated: -1} });
         }
        
         
         items.forEach(function (item) {
            item.time_generated = moment(new Date(item.time_generated)).fromNow();
            data.push(item);
         });
         
         this.response.writeHead(200, {'content-type': 'text/json' });
         this.response.write(JSON.stringify(data));
         this.response.end('\n');
       }
    });
        

});