Template.addDataFeed.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var post = {
          url: $(e.target).find('[name=url]').val(),
          parameter: $(e.target).find('[name=parameter]').val(),
          
        }

        DataFeeds.insert(post);
    }
});