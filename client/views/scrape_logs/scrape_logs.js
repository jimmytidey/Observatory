Template.scrapeLogsList.helpers({
    scrapeLogs: function() {
        return ScrapeLog.find({},{limit:100, sort: {time: -1} } );
    }
});

