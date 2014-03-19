Meteor.startup(function () {

    // All values listed below are default
    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'api',                    // API path prefix
      standAlone: false,                 // Run as a stand-alone HTTP(S) server
      sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
    });

    // Add the collection Players to the API "/players" path
    collectionApi.addCollection(Updates, 'updates', {
      // All values listed below are default
      authToken: undefined,                   // Require this string to be passed in on each request
      methods: ['GET'],  // Allow creating, reading, updating, and deleting
      before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection. If the function returns false the action will be canceled, if you return true the action will take place.
        GET: undefined,  // function(collectionID, objs) {return true/false;},
      }
    });

    // Starts the API server
    collectionApi.start();
});