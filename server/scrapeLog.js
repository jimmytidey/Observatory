

scrapeLog = {}; 

scrapeLog.start = function (source_id, message) { 
    
        var log_entry = {
            type: 'start',
            time: new Date().getTime(),
            source_id: source_id, 
            message: message
        }
    
        ScrapeLog.insert(log_entry);
   
}

scrapeLog.success = function (source_id, message) { 
    var log_entry = {
        type: 'success',
        time: new Date().getTime(),
        source_id: source_id, 
        message: message
    }
    
    ScrapeLog.insert(log_entry); 
}

scrapeLog.error = function (source_id, message) { 
    var log_entry = {
        type: 'error',
        time: new Date().getTime(),
        source_id: source_id, 
        message: message
    }
    
    ScrapeLog.insert(log_entry); 
}

