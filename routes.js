Router.map(function () {
    
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
    
    this.route('home',{
        path: '/'
    });

    this.route('dashboard',{
        path: '/dashboard'
    });
    
    this.route('notFound', {
        path: '*',
        where: 'server',
        action: function(){
            this.response.statusCode = 404;
            this.response.end(Handlebars.templates['404']);    
        }
    });
    

});