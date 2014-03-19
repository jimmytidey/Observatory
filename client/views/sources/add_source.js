Template.addSource.helpers({
    sourceTypes: function() {
        return SourceTypes.find();
    }
});

Template.addSource.events({
    'submit form': function(e) {
        console.log('adding source');
        e.preventDefault();
        
        var source = {
          type: $(e.target).find('[name=type]').val(),
          parameter: $(e.target).find('[name=parameter]').val(),
          frequency: $(e.target).find('[name=frequency]').val()
        }

        Sources.insert(source);
    }
});
