Template.sourcesList.helpers({
    sources: function() {
        
        return Sources.find();
    }
});

//TODO: change the name URL to type... 
Template.sourcesList.events({
    'click .data_feed_go': function () {
        //TODO: allowing the client side to call an arbritrary method is a massive securirty hole
       
        Meteor.call(this.type, this._id, this.parameter);
    }
});