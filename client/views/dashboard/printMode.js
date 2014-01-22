Template.printMode.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var mode = {
            feed_name: $(e.target).find('[name=feed_name]').val(),
            skip: $(e.target).find('.skip_input').val(),
            limit: $(e.target).find('.limit_input').val(),
            time: new Date().getTime()
        }

        PrintMode.insert(mode);
    }
});