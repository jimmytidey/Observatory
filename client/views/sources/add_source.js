Template.addSource.events({
    'submit form': function(e) {
        console.log('adding source');
        e.preventDefault();
        
        var source = {
          url: $(e.target).find('[name=url]').val(),
          parameter: $(e.target).find('[name=parameter]').val(),
        }

        Sources.insert(source);
    }
});