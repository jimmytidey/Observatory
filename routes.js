Router.map(function () {
    
    this.route('home',{
        path: '/'
    });

    this.route('dashboard',{
        path: '/dashboard'
    });
    
    this.route('parser', {
       path: '/parser/:parser',
       where: 'server',
       action: function() {
         var filename = this.params.parser;

         var data = {'hi': 'test'};
         this.response.writeHead(200, {'content-type': 'text/json' });
         this.response.write(JSON.stringify(data) );
         this.response.end('\n');
       }
    });
        

});