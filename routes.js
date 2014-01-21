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
    
    this.route('parser', {
       path: '/stream/',
       where: 'server',
       action: function() {
         
         var data = [];
         
         var items = Items.find({},{limit:100, sort: {time_recorded: -1} });
         
         items.forEach(function (item) {
            item.time_generated =  moment(new Date(item.time_generated)).fromNow();
            data.push(item);
         });
         
         this.response.writeHead(200, {'content-type': 'text/json' });
         this.response.write(JSON.stringify(data));
         this.response.end('\n');
       }
    });
        

});