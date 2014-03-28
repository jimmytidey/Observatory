parser.logging = {};

parser.logging.start = function(source_id) {
    
    var log_entry = {
        type: 'start',
        start_time: new Date().getTime(),
        end_time: null, 
        source_id: source_id       
    }
    
    var source_entry = { 
        status: 'running' 
    }

    var source_entry = { 
        status: 'scraping'
    }

    Sources.update({_id: source_id},{$set: source_entry});

    var scrape_id = ScrapeLog.insert(log_entry);

    return scrape_id;
}    

parser.logging.success = function(scrape_id, source_id, number_of_inserts) {
    
    var log_entry = {
        type: 'success',
        end_time: new Date().getTime(),
        number_of_inserts: number_of_inserts
    }
    
    var source_entry = { 
        status: 'success'
    }

    Sources.update({_id: source_id},{$set: source_entry});
    ScrapeLog.update({_id: scrape_id}, {$set:log_entry});
}

parser.logging.fail = function(scrape_id, source_id, message) {
   
    var log_entry = {
        type: 'fail',
        end_time: new Date().getTime(),
        message: message
    }
    
    var source_entry = { 
        status: 'failing'
    }
    
    Sources.update({_id: source_id}, {$set:source_entry});
    ScrapeLog.update({_id: scrape_id}, {$set:log_entry});
}
